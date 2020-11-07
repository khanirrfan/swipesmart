package controller

import (
	"encoding/json"
	"net/http"
	"fmt"
	"log"

	"github.com/gorilla/mux"
	jwt "github.com/dgrijalva/jwt-go"

	"github.com/swipesmart/model"
)

// GetCoverLetters ...
func GetCoverLetters(w http.ResponseWriter, r *http.Request) {
	fmt.Println("cover letters")
	w.Header().Set("Content-Type", "application/json")
	tokenString := r.Header.Get("Authorization")
	jobID := mux.Vars(r)["jobId"]
	userID := mux.Vars(r)["userId"]
	fmt.Println(jobID,userID)
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
		wg.Add(2) // number of go routines runnig
		go getJobByID(jobID, oneJob)
		go getUserByID(userID, oneUser)
		jobParams := <-oneJob
		userParams := <-oneUser
		fmt.Println("jobParams", jobParams)
		fmt.Println("userParams", userParams)
		wg.Wait()
		go FetchCVFiles(w , r )
	}


}