package controller

// import (
// 	"bytes"
// 	"context"
// 	"encoding/json"
// 	"fmt"
// 	"io"
// 	"log"
// 	"net/http"
// 	"os"

// 	"github.com/swipesmart/utils"

// 	jwt "github.com/dgrijalva/jwt-go"
// 	"github.com/swipesmart/config/db"
// 	"github.com/swipesmart/model"
// 	"go.mongodb.org/mongo-driver/bson"
// 	"go.mongodb.org/mongo-driver/bson/primitive"
// )

// // MatchPercent ...
// func MatchPercent(w http.ResponseWriter, r *http.Request) {
// 	w.Header().Set("Content-Type", "application/json")
// 	tokenString := r.Header.Get("Authorization")
// 	var res model.ResponseResult
// 	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
// 		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
// 			return nil, fmt.Errorf("Unexpected signing method")
// 		}
// 		return []byte("secret"), nil
// 	})
// 	if err != nil {
// 		log.Fatal(err)
// 		res.Error = "Token Not valid"
// 		json.NewEncoder(w).Encode(res)
// 	}
// 	// db connection
// 	dbConnection, err := db.GetDBCollection()
// 	// user collection
// 	userCollection := dbConnection.Collection("user")
// 	// jobs collection
// 	// jobsCollection := dbConnection.Collection("jobs")
// 	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
// 		id, ok := claims["id"].(string)
// 		if !ok {
// 			fmt.Println("hello")
// 			log.Fatal(ok)
// 		}
// 		userID, err := primitive.ObjectIDFromHex(id)
// 		if err != nil {
// 			log.Fatal(err)
// 		}
// 		// var userProfile model.Getuser
// 		// var jobs []model.Getjobs
// 		err = userCollection.FindOne(context.TODO(), bson.M{"_id": userID}).Decode(&userProfile)
// 		if err != nil {
// 			res.Error = "Can not decode document "
// 			utils.RespondWithError(w, http.StatusBadRequest, res)
// 			// fmt.Println("ERROR:", err)
// 		}
// 		var buf = new(bytes.Buffer)
// 		enc := json.NewEncoder(buf)
// 		// enc.Encode(userProfile.Details.Experience[0].Company)
// 		io.Copy(os.Stdout, buf)
// 		// if enc.Encode(userProfile.Details.Experience[0].Company) == "enquero" {
// 		// 	fmt.Println("true")
// 		// }

// 		// fmt.Println(data)
// 		// jobcursor, err := jobsCollection.Find(context.TODO(), bson.M{})
// 		// if err != nil {
// 		// 	log.Fatal(err)
// 		// }
// 		// defer jobcursor.Close(context.Background())
// 		// for jobcursor.Next(context.Background()) {
// 		// 	if _, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
// 		// 		var job model.Getjobs
// 		// 		jobcursor.Decode(&job)
// 		// 		jobs = append(jobs, job)
// 		// 	}
// 		// }
// 		// // fmt.Println("jobs", jobs)
// 		// if err := jobcursor.Err(); err != nil {
// 		// 	w.WriteHeader(http.StatusInternalServerError)
// 		// 	w.Write([]byte(`{"message":"` + err.Error() + `"}`))
// 		// 	return
// 		// }
// 		// json.NewEncoder(w).Encode(jobs)
// 		// json.NewEncoder(w).Encode(&userProfile)
// 	} else {
// 		res.Error = err.Error()
// 		json.NewEncoder(w).Encode(res)
// 		return
// 	}
// }
