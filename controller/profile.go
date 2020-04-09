package controller

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"

	jwt "github.com/dgrijalva/jwt-go"
	"github.com/jwt-auth/config/db"
	"github.com/jwt-auth/model"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func ProfileHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	tokenString := r.Header.Get("Authorization")
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		// Don't forget to validate the alg is what you expect:
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method")
		}
		return []byte("secret"), nil
	})
	if err != nil {
		log.Fatal(err)
	}
	var result model.User
	var res model.ResponseResult

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		fmt.Println("claims:", claims)
		result.Username = claims["username"].(string)
		result.FirstName = claims["firstname"].(string)
		result.LastName = claims["lastname"].(string)
		result.Email = claims["email"].(string)

		json.NewEncoder(w).Encode(result)
		return
	} else {
		res.Error = err.Error()
		json.NewEncoder(w).Encode(res)
		return
	}

}
func GetProfiles(w http.ResponseWriter, r *http.Request) {
	var result []model.Getuser
	w.Header().Set("Content-Type", "application/json")
	tokenString := r.Header.Get("Authorization")
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		// Don't forget to validate the alg is what you expect:
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method")
		}
		return []byte("secret"), nil
	})
	dbConnection, err := db.GetDBCollection()
	collection := dbConnection.Collection("user")
	if err != nil {
		log.Fatal(err)
	}
	cursor, err := collection.Find(context.Background(), bson.D{})
	if err != nil {
		log.Fatal(err)
	}
	defer cursor.Close(context.Background())
	for cursor.Next(context.Background()) {
		if _, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
			var users model.Getuser
			cursor.Decode(&users)
			result = append(result, users)
		}
	}
	if err := cursor.Err(); err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(`{"message":"` + err.Error() + `"}`))
		return
	}
	json.NewEncoder(w).Encode(result)
}
func GetProfileById(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	id := params["id"]
	tokenString := r.Header.Get("Authorization")
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method")
		}
		return []byte("secret"), nil
	})

	if err != nil {
		log.Fatal(err)
	}
	dbConnection, err := db.GetDBCollection()
	collection := dbConnection.Collection("user")
	if err != nil {
		log.Fatal(err)
	}
	userID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		log.Fatal("Invalid ObjectID")
	}
	var userProfile model.Getuser
	if token.Valid {
		err = collection.FindOne(context.TODO(), bson.M{"_id": userID}).Decode(&userProfile)
		if err != nil {
			fmt.Println("FindOne() ObjectIDFromHex ERROR:", err)
		}
	}
	json.NewEncoder(w).Encode(userProfile)
}
