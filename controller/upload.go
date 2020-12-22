package controller

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/gridfs"

	"github.com/swipesmart/config/db"
)

// UploadFile ...
func UploadFile(w http.ResponseWriter, r *http.Request) {
	r.ParseMultipartForm(10 * 1024 * 1024)
	files := r.MultipartForm.File["files"]
	for _, file := range files {
		f, _ := file.Open()
		fileBytes, err := ioutil.ReadAll(f)
		if err != nil {
			log.Fatal(err)
		}
		dbConnection, err := db.GetDBCollection()
		if err != nil {
			log.Fatal(err)
		}
		bucket, err := gridfs.NewBucket(dbConnection)
		if err != nil {
			log.Fatal(err)
		}
		uploadStream, err := bucket.OpenUploadStream(file.Filename)
		defer uploadStream.Close()
		fileSize, err := uploadStream.Write(fileBytes)
		if err != nil {
			log.Fatal(err)
		}
		json.NewEncoder(w).Encode(fileSize)
	}

}

func FetchCVFiles(w http.ResponseWriter, r *http.Request) {
	var bucket *gridfs.Bucket
	dbConnection, err := db.GetDBCollection()
	if err != nil {
		log.Fatal(err)
	}
	bucket, err = gridfs.NewBucket(dbConnection)
	if err != nil {
		log.Fatal(err)
	}
	// Specify a filter to find all files with a length greater than 1000 bytes.
	// filter := bson.D{
	// 	{"length", bson.D{{"$gt", 1000}}},
	// }
	cursor, err := bucket.Find(bson.M{})
	if err != nil {
		log.Fatal(err)
	}
	defer func() {
		if err := cursor.Close(context.TODO()); err != nil {
			log.Fatal(err)
		}
	}()

	type gridfsFile struct {
		id     primitive.ObjectID `bson:"_id`
		Name   string             `bson:"filename"`
		Length int64              `bson:"length"`
	}
	var foundFiles []gridfsFile
	if err = cursor.All(context.TODO(), &foundFiles); err != nil {
		log.Fatal(err)
	}
	json.NewEncoder(w).Encode(foundFiles)

	for _, file := range foundFiles {
		fmt.Printf("filename: %s, length: %d\n", file.Name, file.Length)
	}

	name := "br100_update.txt"
	downloadStream, err := bucket.OpenDownloadStreamByName(name)
	if err != nil {
		log.Printf("Failed to open %s: %v", name, err)
		http.Error(w, "something went wrong", http.StatusInternalServerError)
		return
	}
	defer func() {
		if err := downloadStream.Close(); err != nil {
			log.Fatal(err)
		}
	}()

	// Use SetReadDeadline to force a timeout if the download does not succeed in 2 seconds.
	if err = downloadStream.SetReadDeadline(time.Now().Add(2 * time.Second)); err != nil {
		log.Fatal(err)
	}

	fileBuffer := bytes.NewBuffer(nil)
	if _, err := io.Copy(fileBuffer, downloadStream); err != nil {
		log.Fatal(err)
	}
	fmt.Println(fileBuffer)
}
