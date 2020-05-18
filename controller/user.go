package controller

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strings"

	"github.com/swipesmart/utils"

	"github.com/swipesmart/config/db"
	"github.com/swipesmart/model"

	jwt "github.com/dgrijalva/jwt-go"
	"go.mongodb.org/mongo-driver/bson"
	"golang.org/x/crypto/bcrypt"
)

// TokenVerifyMiddleWare ...
func TokenVerifyMiddleWare(next http.HandlerFunc) http.HandlerFunc {

	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		var errorObject model.ResponseResult
		authHeader := r.Header.Get("Authorization")
		bearerToken := strings.Split(authHeader, " ")

		if len(bearerToken) == 2 {
			authToken := bearerToken[1]

			token, error := jwt.Parse(authToken, func(token *jwt.Token) (interface{}, error) {
				if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
					return nil, fmt.Errorf("There was an error")
				}
				return []byte("secret"), nil

			})

			if error != nil {
				errorObject.Error = error.Error()
				utils.RespondWithError(w, http.StatusUnauthorized, errorObject)
				return
			}
			if token.Valid {
				next.ServeHTTP(w, r)
			} else {
				errorObject.Error = error.Error()
				utils.RespondWithError(w, http.StatusUnauthorized, errorObject)
				return
			}
		} else {
			errorObject.Error = "Invalid Token"
			utils.RespondWithError(w, http.StatusUnauthorized, errorObject)
			return
		}
	})
}

//ProtectedEndPoint ...
func ProtectedEndPoint(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Protected called")
}

// RegisterHandler ...
func RegisterHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var user model.User
	body, _ := ioutil.ReadAll(r.Body)
	err := json.Unmarshal(body, &user)
	var res model.ResponseResult
	if err != nil {
		res.Error = err.Error()
		json.NewEncoder(w).Encode(res)
		return
	}

	dbConnection, err := db.GetDBCollection()
	collection := dbConnection.Collection("user")

	if err != nil {
		res.Error = err.Error()
		json.NewEncoder(w).Encode(res)
		return
	}
	err = collection.FindOne(context.TODO(), bson.D{{"username", user.Username}}).Decode(&user)
	if err != nil {
		if err.Error() == "mongo: no documents in result" {
			hash, err := bcrypt.GenerateFromPassword([]byte(user.Password), 5)

			if err != nil {
				res.Error = "Error While Hashing Password, Try Again"
				json.NewEncoder(w).Encode(res)
				return
			}
			user.Password = string(hash)
			_, err = collection.InsertOne(context.TODO(), user)
			if err != nil {
				res.Error = "Error While Creating User, Try Again"
				json.NewEncoder(w).Encode(res)
				return
			}
			var jwt model.JWT
			res.Result = "Registration Successful"
			token, err := utils.GenerateToken(user)
			if err != nil {
				log.Fatal(err)
			}
			w.WriteHeader(http.StatusOK)
			jwt.Token = token
			utils.ResponseJSON(w, jwt)
			// json.NewEncoder(w).Encode(res)
			return
		}

		res.Error = err.Error()
		json.NewEncoder(w).Encode(res)
		return
	}

	res.Result = "Username already Exists!!"
	json.NewEncoder(w).Encode(res)
	return
}

// LoginHandler ...
func LoginHandler(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Content-Type", "application/json")
	var user model.User
	var error model.ResponseResult
	body, _ := ioutil.ReadAll(r.Body)
	err := json.Unmarshal(body, &user)
	if err != nil {
		log.Fatal(err)
	}
	if user.Email == "" {
		error.Error = "Email is missing"
		utils.RespondWithError(w, http.StatusBadRequest, error)
		return
	}

	if user.Password == "" {
		error.Error = "Password is missing"
		utils.RespondWithError(w, http.StatusBadRequest, error)
		return
	}
	dbConnection, err := db.GetDBCollection()
	collection := dbConnection.Collection("user")
	if err != nil {
		log.Fatal(err)
	}
	var result model.User
	var res model.ResponseResult
	var jwt model.JWT

	err = collection.FindOne(context.TODO(), bson.D{{"username", user.Username}}).Decode(&result)
	if err != nil {
		res.Error = "Invalid username"
		json.NewEncoder(w).Encode(res)
		return
	}

	err = bcrypt.CompareHashAndPassword([]byte(result.Password), []byte(user.Password))
	if err != nil {
		res.Error = "Invalid password"
		json.NewEncoder(w).Encode(res)
		return
	}

	token, err := utils.GenerateToken(result)
	if err != nil {
		log.Fatal(err)
	}
	w.WriteHeader(http.StatusOK)
	jwt.Token = token
	utils.ResponseJSON(w, jwt)
}
