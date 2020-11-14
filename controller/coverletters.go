package controller

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"time"

	jwt "github.com/dgrijalva/jwt-go"
	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/gridfs"

	"github.com/swipesmart/config/db"
	"github.com/swipesmart/model"
)

// GetCoverLetters ...
func GetCoverLetters(w http.ResponseWriter, r *http.Request) {
	fmt.Println("cover letters")
	w.Header().Set("Content-Type", "application/json")
	tokenString := r.Header.Get("Authorization")
	jobID := mux.Vars(r)["jobId"]
	userID := mux.Vars(r)["userId"]
	fmt.Println(jobID, userID)
	var res model.ResponseResult
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method")
		}
		return []byte("secret"), nil
	})
	if err != nil {
		log.Fatal(err)
		res.Error = "Toke not valid"
		json.NewEncoder(w).Encode(res)
	}
	if token.Valid {
		oneUser := make(chan model.Getuser)
		oneJob := make(chan model.Getjobs)
		files := make(chan []model.GridfsFile)
		wg.Add(3) // number of go routines runnig
		go getJobByID(jobID, oneJob)
		go getUserByID(userID, oneUser)
		go fetchFiles(files)
		jobParams := <-oneJob
		userParams := <-oneUser
		fileDetails := <-files
		fmt.Println("jobParams", jobParams)
		fmt.Println("userParams", userParams)
		fmt.Println("file details:", fileDetails)
		wg.Wait()

	}
}

// fetchFiles ...
func fetchFiles(files chan []model.GridfsFile) {
	defer wg.Done()
	fmt.Println("Hello")
	var bucket *gridfs.Bucket
	dbConnection, err := db.GetDBCollection()
	if err != nil {
		fmt.Println("Hello1")
		log.Fatal(err)
	}
	bucket, err = gridfs.NewBucket(dbConnection)
	if err != nil {
		fmt.Println("Hello2")
		log.Fatal(err)
	}
	cursor, err := bucket.Find(bson.M{})
	if err != nil {
		fmt.Println("Hello3")
		log.Fatal(err)
	}
	defer func() {
		if err := cursor.Close(context.TODO()); err != nil {
			log.Fatal(err)
		}
	}()

	var foundFiles []model.GridfsFile
	if err = cursor.All(context.TODO(), &foundFiles); err != nil {
		fmt.Println("Hello4")
		log.Fatal(err)
	}
	files <- foundFiles
	// close(files)

}

// ReadFileByName ...
func ReadFileByName(w http.ResponseWriter, r *http.Request) {
	var bucket *gridfs.Bucket
	// fileName := mux.Vars(r)["name"]
	dbConnection, err := db.GetDBCollection()
	if err != nil {
		log.Fatal(err)
	}
	bucket, err = gridfs.NewBucket(dbConnection)
	if err != nil {
		log.Fatal(err)
	}
	name := "br100_update.txt"
	downloadStream, err := bucket.OpenDownloadStreamByName(name)
	if err != nil {
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
	_, err = fileBuffer.WriteTo(w)
}
