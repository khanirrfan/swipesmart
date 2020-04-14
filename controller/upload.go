package controller

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/jwt-auth/config/db"
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
