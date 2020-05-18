package controller

import (
	"context"
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"

	"go.mongodb.org/mongo-driver/bson/primitive"

	"github.com/swipesmart/config/db"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/gridfs"
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

	// for _, file := range foundFiles {
	// 	fmt.Printf("filename: %s, length: %d\n", file.Name, file.Length)
	// }
}

// func DownloadFile(w http.ResponseWriter, r *http.Request) {
// 	dbConnection, err := db.GetDBCollection()

// 	fsFiles := dbConnection.Collection("fs.files")
// 	var results bson.M
// 	err = fsFiles.FindOne(context.Background(), bson.M{}).Decode(&results)
// 	if err != nil {
// 		log.Fatal(err)
// 	}
// 	// you can print out the results
// 	fmt.Println(results)

// 	bucket, _ := gridfs.NewBucket(dbConnection)
// 	var buf bytes.Buffer
// 	dStream, err := bucket.DownloadToStreamByName(fileName, &buf)
// 	if err != nil {
// 		log.Fatal(err)
// 	}
// 	fmt.Printf("File size to download: %v\n", dStream)
// 	ioutil.WriteFile(fileName, buf.Bytes(), 0600)
// }
