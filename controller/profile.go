package controller

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/gorilla/mux"

	jwt "github.com/dgrijalva/jwt-go"
	"github.com/swipesmart/config/db"
	"github.com/swipesmart/model"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// ProfileHandler ...
func ProfileHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	tokenString := r.Header.Get("Authorization")

	fmt.Println("tokenString", tokenString)
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			fmt.Println("2")
			return nil, fmt.Errorf("Unexpected signing method")
		}
		return []byte("secret"), nil
	})
	// fmt.Println("token:", token)
	if err != nil {
		fmt.Println("3")
		log.Fatal(err)
	}
	var res model.ResponseResult
	dbConnection, err := db.GetDBCollection()
	collection := dbConnection.Collection("user")
	if err != nil {
		fmt.Println("3")
		log.Fatal(err)
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		id, ok := claims["id"].(string)
		if !ok {
			fmt.Println("4")
			log.Fatal(ok)
		}
		userID, err := primitive.ObjectIDFromHex(id)
		if err != nil {
			fmt.Println("5")
			log.Fatal(err)
		}
		var userProfile model.Getuser
		err = collection.FindOne(context.TODO(), bson.M{"_id": userID}).Decode(&userProfile)
		if err != nil {
			fmt.Println("6")
			fmt.Println("ERROR:", err)
		}
		json.NewEncoder(w).Encode(userProfile)

	} else {
		res.Error = err.Error()
		json.NewEncoder(w).Encode(res)

	}
}

// GetProfiles ...
func GetProfiles(w http.ResponseWriter, r *http.Request) {
	var result []model.Getuser
	w.Header().Set("Content-Type", "application/json")
	tokenString := r.Header.Get("Authorization")
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
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

// GetProfileByID ...
func GetProfileByID(w http.ResponseWriter, r *http.Request) {
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

// UpdateProfile ...
func UpdateProfile(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var profile model.Getuser
	profileID := mux.Vars(r)["id"]
	w.Write([]byte(profileID))
	updProfile, _ := ioutil.ReadAll(r.Body)
	fmt.Println(updProfile)
	json.Unmarshal(updProfile, &profile)
	tokenString := r.Header.Get("Authorization")
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method")
		}
		return []byte("secret"), nil
	})

	if err != nil {
		fmt.Println("hello------")
		log.Fatal(err)
	}
	dbConnection, err := db.GetDBCollection()
	collection := dbConnection.Collection("users")
	if err != nil {
		fmt.Println("hello------+++++++")
		log.Fatal(err)
	}
	profileByID, err := primitive.ObjectIDFromHex(profileID)

	fmt.Println(profileByID, profileID)
	if token.Valid {
		result, err := collection.UpdateOne(context.TODO(), bson.M{"_id": profileByID}, bson.M{"$set": &profile})
		fmt.Println("err", err, "result", result.UpsertedCount, result.UpsertedID, result.MatchedCount, result.ModifiedCount)
		if err != nil {
			fmt.Println("hello------========")
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte(err.Error()))
		}
	}

}
