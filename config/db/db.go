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

func GetDBCollection() (*mongo.Database, error) {

	clientOptions, err := mongo.NewClient(options.Client().ApplyURI("mongodb://localhost:27017"))
	// client, _ = mongo.Connect(ctx, clientOptions)
	if err != nil {
		log.Fatal(err)
	}
	// quit := make(chan os.Signal)
	// signal.Notify(quit, os.Interrupt, syscall.SIGINT, syscall.SIGTERM)
	// <-quit
	ctx, cancel := context.WithTimeout(context.Background(), 50*time.Second)
	err = clientOptions.Connect(ctx)
	if err != nil {
		log.Fatal(err)
	}
	defer cancel()
	DBConnection := clientOptions.Database("userdetails")
	// allUserProfile, err := collection.Find(ctx, bson.M{})
	return DBConnection, nil
}
