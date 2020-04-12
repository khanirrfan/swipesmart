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
	if err != nil {
		log.Fatal(err)
	}
	ctx, cancel := context.WithTimeout(context.Background(), 50*time.Second)
	err = clientOptions.Connect(ctx)
	if err != nil {
		log.Fatal(err)
	}
	defer cancel()
	DBConnection := clientOptions.Database("userdetails")
	return DBConnection, nil
}
