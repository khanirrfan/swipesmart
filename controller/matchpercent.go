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
	"github.com/swipesmart/config/db"
	"github.com/swipesmart/model"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
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
	// var jobs []model.Getjobs
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
		fmt.Println("found document", <-oneUser)
		fmt.Println("found document", <-oneJob)
		wg.Wait()
	}

}

func getJobByID(jjid string, oneJob chan model.Getjobs) {
	defer wg.Done()
	//
	// var jobs []model.Getjobs
	jobID, err := primitive.ObjectIDFromHex(jjid)
	if err != nil {
		log.Fatal(err)
	}
	dbConnection, err := db.GetDBCollection()
	collection := dbConnection.Collection("jobs")
	fmt.Println("job id:", jobID)
	if err != nil {
		log.Fatal(err)
	}
	var job model.Getjobs
	err = collection.FindOne(context.TODO(), bson.D{{"_id", jobID}}).Decode(&job)
	if err != nil {
		fmt.Println("error line")
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
		fmt.Println("error line")
		if err == mongo.ErrNoDocuments {
			return
		}
		log.Fatal(err)
	}

	oneUser <- user
	close(oneUser)
}
