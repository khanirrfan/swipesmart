package controller

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"sync"

	"github.com/gorilla/mux"
	jwt "github.com/dgrijalva/jwt-go"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"

	"github.com/swipesmart/config/db"
	"github.com/swipesmart/model"
)

var wg sync.WaitGroup

// var lock sync.Mutex

// MatchPercent ...
func MatchPercent(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	tokenString := r.Header.Get("Authorization")
	jid := mux.Vars(r)["jobId"]
	uid := mux.Vars(r)["userId"]
	var res model.ResponseResult
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method")
		}
		return []byte("secret"), nil
	})
	
	if err != nil {
		log.Fatal(err)
		res.Error = "Token Not valid"
		json.NewEncoder(w).Encode(res)
	}
	if token.Valid {
		oneUser := make(chan model.Getuser)
		oneJob := make(chan model.Getjobs)
		wg.Add(2) // number of go routines runnig
		go getJobByID(jid, oneJob)
		go getUserByID(uid, oneUser)
		jobParams := <-oneJob
		userParams := <-oneUser
		wg.Wait()
		var count = 0
		for i := 0; i < len(jobParams.Skills); i++ {

			for j := 0; j < len(userParams.Skills); j++ {
				if jobParams.Skills[i] == userParams.Skills[j] {
					count++
				}

			}

		}
		jobMatchPercenat := float64(float64(count)/float64(len(jobParams.Skills))) * 100
		fmt.Println(jobMatchPercenat)
		json.NewEncoder(w).Encode(jobMatchPercenat)
	}

}

func getJobByID(jjid string, oneJob chan model.Getjobs) {
	defer wg.Done()
	jobID, err := primitive.ObjectIDFromHex(jjid)
	if err != nil {
		log.Fatal(err)
	}
	dbConnection, err := db.GetDBCollection()
	collection := dbConnection.Collection("jobs")
	if err != nil {
		log.Fatal(err)
	}
	var job model.Getjobs
	err = collection.FindOne(context.TODO(), bson.D{{"_id", jobID}}).Decode(&job)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return
		}
		log.Fatal(err)
	}

	oneJob <- job
	close(oneJob)
}

func getUserByID(uuid string, oneUser chan model.Getuser) {
	defer wg.Done()
	userID, err := primitive.ObjectIDFromHex(uuid)
	if err != nil {
		log.Fatal(err)
	}
	dbConnection, err := db.GetDBCollection()
	collection := dbConnection.Collection("user")
	if err != nil {
		log.Fatal(err)
	}
	var user model.Getuser
	err = collection.FindOne(context.TODO(), bson.D{{"_id", userID}}).Decode(&user)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return
		}
		log.Fatal(err)
	}

	oneUser <- user
	close(oneUser)
}
