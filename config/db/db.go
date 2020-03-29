package db

import (
	"context"
	"log"
	"time"

	// "github.com/mongodb/mongo-go-driver/bson"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var client *mongo.Database

func GetDBCollection() (*mongo.Collection, error) {
	// client, err := mongo.Connect(context.TODO(), "mongodb://localhost:27017")
	// if err != nil {
	// 	return nil, err
	// }
	// // Check the connection
	// err = client.Ping(context.TODO(), nil)
	// if err != nil {
	// 	return nil, err
	// }
	clientOptions, err := mongo.NewClient(options.Client().ApplyURI("mongodb://localhost:27017"))
	// client, _ = mongo.Connect(ctx, clientOptions)
	if err != nil {
		log.Fatal(err)
	}
	ctx, cancel := context.WithTimeout(context.Background(), 50*time.Second)
	err = clientOptions.Connect(ctx)
	if err != nil {
		log.Fatal(err)
	}
	defer cancel()
	collection := clientOptions.Database("userdetails").Collection("user")
	// allUserProfile, err := collection.Find(ctx, bson.M{})
	return collection, nil
}
