package controller

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"go.mongodb.org/mongo-driver/mongo/options"

	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"

	"github.com/swipesmart/config/db"
	"go.mongodb.org/mongo-driver/bson"

	"github.com/swipesmart/model"
)

// CreatePost ...
func CreatePost(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-ype", "application/json")
	var posts model.Post
	// get user id from req
	uID := mux.Vars(r)["id"]
	// reading post content from request body
	body, _ := ioutil.ReadAll(r.Body)
	err := json.Unmarshal(body, &posts)
	if err != nil {
		log.Fatal(err)
	}

	// token authentication

	dbConnection, err := db.GetDBCollection()
	if err != nil {
		log.Fatal(err)
	}
	collection := dbConnection.Collection("success_story")
	userID, err := primitive.ObjectIDFromHex(uID)
	posts.UID = userID
	cursor, err := collection.InsertOne(context.Background(), posts)
	if err != nil {
		log.Fatal(err)
	}
	json.NewEncoder(w).Encode(cursor)

}

// GetPost ...
func GetPost(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-ype", "application/json")
	var posts []model.Post

	// token authentication

	dbConnection, err := db.GetDBCollection()
	if err != nil {
		log.Fatal(err)
	}
	collection := dbConnection.Collection("success_story")
	cursor, err := collection.Find(context.Background(), bson.M{})
	if err != nil {
		log.Fatal(err)
	}
	defer cursor.Close(context.Background())
	for cursor.Next(context.Background()) {

		var post model.Post
		cursor.Decode(&post)
		posts = append(posts, post)

	}
	if err := cursor.Err(); err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(`{"message":"` + err.Error() + `"}`))
		return
	}
	json.NewEncoder(w).Encode(posts)
}

// EditPost ...
func EditPost(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var post model.Post
	editablePost, _ := ioutil.ReadAll(r.Body)
	json.Unmarshal(editablePost, &post)

	dbConnection, err := db.GetDBCollection()
	if err != nil {
		log.Fatal(err)
	}
	collection := dbConnection.Collection("success_story")
	filter := bson.D{{"_id", post.ID}}
	update := bson.D{{"$set", &post}}
	err = collection.FindOneAndUpdate(context.Background(), filter, update).Decode(&post)
	if err != nil {
		log.Fatal(err)
	}
}

// DeletePost ...
func DeletePost(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	pid := mux.Vars(r)["id"]

	// token authorization

	dbConnection, err := db.GetDBCollection()
	if err != nil {
		log.Fatal(err)
	}
	collection := dbConnection.Collection("success_story")
	id, err := primitive.ObjectIDFromHex(pid)

	if err != nil {
		log.Fatal(err)
	}
	var post bson.M
	err = collection.FindOneAndDelete(context.TODO(), bson.D{{"_id", id}}, options.FindOneAndDelete()).Decode(&post)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return
		}
		log.Fatal(err)
	}
	json.NewEncoder(w).Encode(post)
}

// LikePost ...
func LikePost(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("ContentType", "application/json")
	pid := mux.Vars(r)["id"]

	// token authentication
	dbConnection, err := db.GetDBCollection()
	if err != nil {
		log.Fatal(err)
	}
	collection := dbConnection.Collection("success_story")
	id, err := primitive.ObjectIDFromHex(pid)
	fmt.Println(id)
	if err != nil {
		log.Fatal(err)
	}
	var result bson.M
	err = collection.FindOne(context.TODO(), bson.D{{"_id", id}}).Decode(&result)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return
		}
		log.Fatal(err)
	}

	json.NewEncoder(w).Encode(result)
}

// UnlikePost ...
func UnlikePost(w http.ResponseWriter, r *http.Request) {
	fmt.Println("un like")
}

// Comment ...
func Comment(w http.ResponseWriter, r *http.Request) {
	fmt.Println("commnet")
}

// DeleteComment ...
func DeleteComment(w http.ResponseWriter, r *http.Request) {
	fmt.Println("delete comment")
}

// EditComment ...
func EditComment(w http.ResponseWriter, r *http.Request) {

	fmt.Println("edit comment")
}
