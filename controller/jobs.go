package controller

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	jwt "github.com/dgrijalva/jwt-go"
	"github.com/jwt-auth/config/db"
	"github.com/jwt-auth/model"
	"go.mongodb.org/mongo-driver/bson"
)

func CreateJobs(w http.ResponseWriter, r *http.Request) {
	var jobs model.Jobs
	body, _ := ioutil.ReadAll(r.Body)
	err := json.Unmarshal(body, &jobs)
	tokenString := r.Header.Get("Authorization")
	// utils.TokenValidation(w http.ResponseWriter, r *http.Request)
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
	dbConnection, err := db.GetDBCollection()
	collection := dbConnection.Collection("jobs")
	if err != nil {
		log.Fatal(err)
	}
	if token.Valid {
		cursor, err := collection.InsertOne(context.TODO(), jobs)
		if err != nil {
			log.Fatal(err)
		}
		json.NewEncoder(w).Encode(cursor)
		// fmt.Println(cursor)
	}
}

func GetJobs(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-ype", "application/json")
	var jobs []model.GetJobs
	tokenString := r.Header.Get("Authorization")
	// utils.TokenValidation(w http.ResponseWriter, r *http.Request)
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
	dbConnection, err := db.GetDBCollection()
	collection := dbConnection.Collection("jobs")
	if err != nil {
		log.Fatal(err)
	}
	cursor, err := collection.Find(context.Background(), bson.M{})
	// w.Write([]byte("Hello jobs"))
	if err != nil {
		log.Fatal(err)
	}
	defer cursor.Close(context.Background())
	for cursor.Next(context.Background()) {
		if _, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
			var job model.GetJobs
			cursor.Decode(&job)
			jobs = append(jobs, job)
			fmt.Println(jobs)
		}
	}
	if err := cursor.Err(); err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(`{"message":"` + err.Error() + `"}`))
		return
	}
	json.NewEncoder(w).Encode(jobs)
}
