package controller

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	// "go.mongodb.org/mongo-driver/x/mongo/driver/mongocrypt/options"
	jwt "github.com/dgrijalva/jwt-go"
	"github.com/gorilla/mux"

	// "github.com/mongodb/mongo-go-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/options"
	// "github.com/mongodb/mongo-go-driver/mongo/options"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"

	"github.com/swipesmart/config/db"
	"github.com/swipesmart/model"
)

// CreateJobs ...
func CreateJobs(w http.ResponseWriter, r *http.Request) {
	var jobs model.Jobs
	body, _ := ioutil.ReadAll(r.Body)
	err := json.Unmarshal(body, &jobs)
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
	if err != nil {
		log.Fatal(err)
	}
	collection := dbConnection.Collection("jobs")

	if token.Valid {
		cursor, err := collection.InsertOne(context.TODO(), jobs)
		if err != nil {
			log.Fatal(err)
		}
		json.NewEncoder(w).Encode(cursor)
	}
}

// GetJobs ...
func GetJobs(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-ype", "application/json")
	var jobs []model.Getjobs
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
	cursor, err := collection.Find(context.Background(), bson.M{})
	if err != nil {
		log.Fatal(err)
	}
	defer cursor.Close(context.Background())
	for cursor.Next(context.Background()) {
		if _, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
			var job model.Getjobs
			cursor.Decode(&job)
			jobs = append(jobs, job)
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
			fmt.Println(" ERROR:", err)
		}
		fmt.Println(result.DeletedCount)

	}
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
	// go.mongodb.org/mongo-driver/mongo
	fmt.Println(jobByID)
	opts := options.FindOneAndUpdate().SetUpsert(true)
	filter := bson.D{{"_id", jobByID}}
	update := bson.D{{"$set", &job}}
	// var updatedDocument bson.M

	if token.Valid {
		err := collection.FindOneAndUpdate(context.Background(), filter, update, opts).Decode(&job)
		if err != nil {
			fmt.Println("error:", err)
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte(err.Error()))
		} else {
			w.Write([]byte("Updated successfully"))
			fmt.Println(job)
		}
	}

}

// AppliedJobs ...
func AppliedJobs(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var job model.Getjobs
	id := mux.Vars(r)["id"]
	updJob, _ := ioutil.ReadAll(r.Body)
	json.Unmarshal(updJob, &job)
	// currentJobID := job.JobID
	fmt.Println("body job:", job)
	var newSavedJobs model.SavedJobs
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
	var response model.ResponseResult
	dbConnection, err := db.GetDBCollection()
	// collection := dbConnection.Collection("jobs")
	saveCollection := dbConnection.Collection("appliedJobs")
	if err != nil {
		log.Fatal(err)
	}

	// if  token.Valid {
	// 	// id, ok := claims["id"].(string)
	// 	if !ok {
	// 		log.Fatal(ok) 
	userID, err := primitive.ObjectIDFromHex(id)
	// if err != nil {
	// 	log.Fatal(err)
	// } 
	// err = collection.FindOne(context.TODO(), bson.M{"_id": currentJobID}).Decode(&job)
	// if err != nil {
	// 	fmt.Println("FindOne() ObjectIDFromHex ERROR:", err)
	// }
	newSavedJobs.UserID = userID
	newSavedJobs.Jobs = job
	newSavedJobs.Jobs.Status = "Applied"

	fmt.Println("savedJobs:", newSavedJobs)
	if token.Valid {
		cursor, err := saveCollection.InsertOne(context.TODO(), newSavedJobs)
		if err != nil {
			log.Fatal(err)
		}
		json.NewEncoder(w).Encode(cursor)

	} else {
		response.Error = err.Error()
		json.NewEncoder(w).Encode(response)
	}
}

// RejectedJobs ...
func RejectedJobs(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var job model.Getjobs
	id := mux.Vars(r)["id"]
	updJob, _ := ioutil.ReadAll(r.Body)
	json.Unmarshal(updJob, &job)
	// currentJobID := job.JobID
	fmt.Println("body job:", job)
	var newSavedJobs model.SavedJobs
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
	var response model.ResponseResult
	dbConnection, err := db.GetDBCollection()
	// collection := dbConnection.Collection("jobs")
	saveCollection := dbConnection.Collection("rejectedJobs")
	if err != nil {
		log.Fatal(err)
	}

	// id, ok := claims["id"].(string)
	// if !ok {
	// 	log.Fatal(ok)
	// }

	// if err != nil {
	// 	log.Fatal(err)
	// }
	// err = collection.FindOne(context.TODO(), bson.M{"_id": currentJobID}).Decode(&job)
	// if err != nil {
	// 	fmt.Println("FindOne() ObjectIDFromHex ERROR:", err)
	// }
	userID, err := primitive.ObjectIDFromHex(id)
	newSavedJobs.UserID = userID
	newSavedJobs.Jobs = job
	fmt.Println("savedJobs:", newSavedJobs)
	if token.Valid {
		cursor, err := saveCollection.InsertOne(context.TODO(), newSavedJobs)
		if err != nil {
			log.Fatal(err)
		}
		json.NewEncoder(w).Encode(cursor)

	} else {
		response.Error = err.Error()
		json.NewEncoder(w).Encode(response)
	}
}

// SaveJobs ...
func SaveJobs(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var job model.Getjobs
	id := mux.Vars(r)["id"]
	updJob, _ := ioutil.ReadAll(r.Body)
	json.Unmarshal(updJob, &job)
	// currentJobID := job.JobID
	fmt.Println("body job:", job)
	var newSavedJobs model.SavedJobs
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
	var response model.ResponseResult
	dbConnection, err := db.GetDBCollection()
	// collection := dbConnection.Collection("jobs")
	saveCollection := dbConnection.Collection("savedJobs")
	if err != nil {
		log.Fatal(err)
	}

	// id, ok := claims["id"].(string)
	// if !ok {
	// 	log.Fatal(ok)
	// }
	// userID, err := primitive.ObjectIDFromHex(id)
	// if err != nil {
	// 	log.Fatal(err)
	// }
	// // err = collection.FindOne(context.TODO(), bson.M{"_id": currentJobID}).Decode(&job)
	// // if err != nil {
	// // 	fmt.Println("FindOne() ObjectIDFromHex ERROR:", err)
	// // }
	userID, err := primitive.ObjectIDFromHex(id)
	newSavedJobs.UserID = userID
	newSavedJobs.Jobs = job
	fmt.Println("savedJobs:", newSavedJobs)
	if token.Valid {
		cursor, err := saveCollection.InsertOne(context.TODO(), newSavedJobs)
		if err != nil {
			log.Fatal(err)
		}
		json.NewEncoder(w).Encode(cursor)

	} else {
		response.Error = err.Error()
		json.NewEncoder(w).Encode(response)
	}
}

// GetAppliedJobs ...
func GetAppliedJobs(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-ype", "application/json")
	var jobs []model.SavedJobs
	var response model.ResponseResult
	id := mux.Vars(r)["id"]
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
	fmt.Println("token:", token)
	dbConnection, err := db.GetDBCollection()
	collection := dbConnection.Collection("appliedJobs")
	if err != nil {
		log.Fatal(err)
	}
	if token.Valid {
		userID, err := primitive.ObjectIDFromHex(id)
		fmt.Println("user id:", userID)
		// batch size can be used for pagination in future
		// opts := options.Find()
		filter := bson.D{{"_uid", userID}}
		// update := bson.D{{"$set", &job}}
		cursor, err := collection.Find(context.Background(), filter)
		if err != nil {
			fmt.Println("3")
			log.Fatal(err)
		}
		defer cursor.Close(context.Background())
		for cursor.Next(context.Background()) {
			if _, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
				var job model.SavedJobs
				cursor.Decode(&job)
				jobs = append(jobs, job)
			}
		}
		if err := cursor.Err(); err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte(`{"message":"` + err.Error() + `"}`))
			return
		}
		json.NewEncoder(w).Encode(jobs)
	} else {
		response.Error = err.Error()
		json.NewEncoder(w).Encode(response)
	}
}

// GetSavedJobs ...
func GetSavedJobs(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-ype", "application/json")
	var jobs []model.SavedJobs
	var response model.ResponseResult
	id := mux.Vars(r)["id"]
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
	collection := dbConnection.Collection("savedJobs")
	if err != nil {
		log.Fatal(err)
	}
	if token.Valid {
		userID, err := primitive.ObjectIDFromHex(id)
		fmt.Println("user id:", userID)
		// batch size can be used for pagination in future
		opts := options.Find()
		filter := bson.D{{"_uid", userID}}
		// update := bson.D{{"$set", &job}}
		cursor, err := collection.Find(context.Background(), filter, opts)
		if err != nil {
			fmt.Println("3")
			log.Fatal(err)
		}

		defer cursor.Close(context.Background())
		for cursor.Next(context.Background()) {
			if _, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
				var job model.SavedJobs
				cursor.Decode(&job)
				jobs = append(jobs, job)
			}
		}
		if err := cursor.Err(); err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte(`{"message":"` + err.Error() + `"}`))
			return
		}
		json.NewEncoder(w).Encode(jobs)
	} else {
		response.Error = err.Error()
		json.NewEncoder(w).Encode(response)
	}
}

// GetRejectedJobs ...
func GetRejectedJobs(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-ype", "application/json")
	var jobs []model.SavedJobs
	var response model.ResponseResult
	id := mux.Vars(r)["id"]
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
	collection := dbConnection.Collection("rejectedJobs")
	if err != nil {
		log.Fatal(err)
	}
	if token.Valid {
		userID, err := primitive.ObjectIDFromHex(id)
		fmt.Println("user id:", userID)
		// batch size can be used for pagination in future
		opts := options.Find()
		filter := bson.D{{"_uid", userID}}
		// update := bson.D{{"$set", &job}}
		cursor, err := collection.Find(context.Background(), filter, opts)
		if err != nil {
			fmt.Println("3")
			log.Fatal(err)
		}
		defer cursor.Close(context.Background())
		for cursor.Next(context.Background()) {
			if _, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
				var job model.SavedJobs
				cursor.Decode(&job)
				jobs = append(jobs, job)
			}
		}
		if err := cursor.Err(); err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte(`{"message":"` + err.Error() + `"}`))
			return
		}
		json.NewEncoder(w).Encode(jobs)
	} else {
		response.Error = err.Error()
		json.NewEncoder(w).Encode(response)
	}

}

// FilterJobs ...

func FilterJobs(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-type", "application/json")
	var jobs []model.Getjobs
	var params model.FilterParams
	filterParams, _ := ioutil.ReadAll(r.Body)
	json.Unmarshal(filterParams, &params)
	// currentJobID := job.JobID
	fmt.Println("body job:", params.JobTitle)
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
	if err != nil {
		log.Fatal(err)
	}
	collection := dbConnection.Collection("jobs")
	filter := bson.M{"salary": params.Salary, "jobtitle": params.JobTitle}
	fmt.Println("filter", filter)
	// var filter bson.M
	// if params.JobTitle != " " || params.Salary == " " {
	// 	filter = bson.M{"jobtitle": params.JobTitle}
	// 	fmt.Println("1", params.JobTitle)
	// } else if params.JobTitle == " " || params.Salary != " " {
	// 	filter = bson.M{"salary": params.Salary}
	// 	fmt.Println("2", params.Salary)
	// } else {
	// 	filter = bson.M{"salary": params.Salary, "jobtitle": params.JobTitle}
	// 	fmt.Println("3", params)
	// }
	// if (jobtypes == null ) {
	// 	db.Jobs.find(
	// 		{Country : country ,
	// 		  JobCategory : jobcategory
	// 		},
	// 		{_id : 0 }
	// 	)
	// } else if (country == null && jobtypes == null) {
	// 	db.Jobs.find(
	// 		{JobCategory : jobcategory},
	// 		{_id : 0 }
	// 	)
	// } else if (jobcategory == null && jobtypes == null ) {
	// 	db.Jobs.find(
	// 		{Country : country},
	// 		{_id : 0 }
	// 	)
	// } else {
	// 	db.Jobs.find(
	// 		{Country : country ,
	// 		  JobCategory : jobcategory,
	// 		  JobTypes : /jobtypes/
	// 		},
	// 		{_id : 0 }
	// 	)
	// }
	cursor, err := collection.Find(context.Background(), filter)
	if err != nil {
		log.Fatal(err)
	}
	defer cursor.Close(context.Background())
	for cursor.Next(context.Background()) {
		if _, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
			var job model.Getjobs
			cursor.Decode(&job)
			jobs = append(jobs, job)
		}
	}
	if err := cursor.Err(); err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(`{"message":"` + err.Error() + `"}`))
		return
	}
	json.NewEncoder(w).Encode(jobs)
}
