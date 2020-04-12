package controller

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	jwt "github.com/dgrijalva/jwt-go"
	"github.com/gorilla/mux"
	"github.com/jwt-auth/config/db"
	"github.com/jwt-auth/model"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// CreateJobs ...
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

// GetJobs ...
func GetJobs(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-ype", "application/json")
	var jobs []model.Getjobs
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
			var job model.Getjobs
			cursor.Decode(&job)
			jobs = append(jobs, job)
			// fmt.Println(jobs)
		}
	}
	if err := cursor.Err(); err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(`{"message":"` + err.Error() + `"}`))
		return
	}
	json.NewEncoder(w).Encode(jobs)
}

// DeleteJobByID ...
func DeleteJobByID(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	jobID := mux.Vars(r)["id"]
	// id := params["id"]
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
	collection := dbConnection.Collection("jobs")
	if err != nil {
		log.Fatal(err)
	}

	jobByID, err := primitive.ObjectIDFromHex(jobID)

	fmt.Println(jobByID, jobID)
	if err != nil {
		log.Fatal("Invalid ObjectID")
	}
	var jobs model.Getjobs
	if token.Valid {
		result, err := collection.DeleteOne(context.TODO(), bson.M{"_id": jobByID})
		if err != nil {
			fmt.Println("FindOne() ObjectIDFromHex ERROR:", err)
		}
		fmt.Println(result.DeletedCount)

	}
	fmt.Println("job delete successfully")
	json.NewEncoder(w).Encode(jobs)

}

// UpdateJob ...
func UpdateJob(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	jobID := mux.Vars(r)["id"]
	var job model.Jobs
	updJob, _ := ioutil.ReadAll(r.Body)
	json.Unmarshal(updJob, &job)

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
	collection := dbConnection.Collection("jobs")
	if err != nil {
		log.Fatal(err)
	}
	jobByID, err := primitive.ObjectIDFromHex(jobID)

	fmt.Println(jobByID, jobID)
	if token.Valid {
		result, err := collection.UpdateOne(context.TODO(), bson.M{"_id": jobByID}, bson.M{"$set": &job})
		fmt.Println("err", err, "result", result.UpsertedCount, result.UpsertedID, result.MatchedCount, result.ModifiedCount)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte(err.Error()))
		} else {
			w.Write([]byte("Updated successfully"))
		}
	}
}

// AppliedJobs ...
func AppliedJobs(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

}

// RejectedJobs ...
func RejectedJobs(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

}

// SaveJobs ...
func SaveJobs(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var jobResponse model.Getjobs
	tokenString := r.Header.Get("Authorization")
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method")
		}
		return []byte("secret"), nil
	})
	fmt.Println("token:", token)
	if err != nil {
		log.Fatal(err)
	}
	var response model.ResponseResult
	dbConnection, err := db.GetDBCollection()
	collection := dbConnection.Collection("jobs")
	if err != nil {
		log.Fatal(err)
	}
	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		fmt.Println(claims)
		id, ok := claims["id"].(string)
		if !ok {
			fmt.Println("Hello3")
			log.Fatal(ok)
		}
		userID, err := primitive.ObjectIDFromHex(id)
		fmt.Println(userID)
		if err != nil {
			log.Fatal(err)
		}
		err = collection.FindOne(context.TODO(), bson.M{"_id": userID}).Decode(&jobResponse)
		if err != nil {
			fmt.Println("FindOne() ObjectIDFromHex ERROR:", err)
		}
		json.NewEncoder(w).Encode(jobResponse)
		return
	} else {
		response.Error = err.Error()
		json.NewEncoder(w).Encode(response)
		return
	}
}
