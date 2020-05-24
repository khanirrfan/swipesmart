package controller

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/gorilla/mux"

	jwt "github.com/dgrijalva/jwt-go"
	"github.com/swipesmart/config/db"
	"github.com/swipesmart/model"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// ProfileHandler ... calls when application loads first time or every time
func ProfileHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	tokenString := r.Header.Get("Authorization")

	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method")
		}
		return []byte("secret"), nil
	})
	if err != nil {
		log.Fatal(err)
	}
	var res model.ResponseResult
	dbConnection, err := db.GetDBCollection()
	collection := dbConnection.Collection("user")
	if err != nil {
		log.Fatal(err)
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		nameUser, ok := claims["username"].(string)
		if !ok {
			log.Fatal(ok)
		}
		// userID, err := primitive.ObjectIDFromHex(id)
		// if err != nil {
		// 	log.Fatal(err)
		// }
		var userProfile model.Getuser
		err = collection.FindOne(context.TODO(), bson.M{"username": nameUser}).Decode(&userProfile)
		if err != nil {
			fmt.Println('2', err)
			fmt.Println("ERROR:", err)
		}
		json.NewEncoder(w).Encode(userProfile)

	} else {
		res.Error = err.Error()
		json.NewEncoder(w).Encode(res)

	}
}

// GetProfiles ... get all profiles
func GetProfiles(w http.ResponseWriter, r *http.Request) {
	var result []model.Getuser
	w.Header().Set("Content-Type", "application/json")
	tokenString := r.Header.Get("Authorization")
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method")
		}
		return []byte("secret"), nil
	})
	dbConnection, err := db.GetDBCollection()
	collection := dbConnection.Collection("user")
	if err != nil {
		log.Fatal(err)
	}
	cursor, err := collection.Find(context.Background(), bson.D{})
	if err != nil {
		log.Fatal(err)
	}
	defer cursor.Close(context.Background())
	for cursor.Next(context.Background()) {
		if _, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
			var users model.Getuser
			cursor.Decode(&users)
			result = append(result, users)
		}
	}
	if err := cursor.Err(); err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(`{"message":"` + err.Error() + `"}`))
		return
	}
	json.NewEncoder(w).Encode(result)
}

// GetProfileByID ... get profile by id
func GetProfileByID(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	id := params["id"]
	tokenString := r.Header.Get("Authorization")
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method")
		}
		return []byte("secret"), nil
	})

	if err != nil {
		log.Fatal(err)
	}
	dbConnection, err := db.GetDBCollection()
	collection := dbConnection.Collection("user")
	if err != nil {
		log.Fatal(err)
	}
	userID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		log.Fatal("Invalid ObjectID")
	}
	var userProfile model.Getuser
	if token.Valid {
		err = collection.FindOne(context.TODO(), bson.M{"_id": userID}).Decode(&userProfile)
		if err != nil {
			fmt.Println("FindOne() ObjectIDFromHex ERROR:", err)
		}
	}
	json.NewEncoder(w).Encode(userProfile)
}

// UpdateProfile ...
func UpdateProfile(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	pID := mux.Vars(r)["id"]
	var profile model.Getuser
	userProfile, _ := ioutil.ReadAll(r.Body)
	json.Unmarshal(userProfile, &profile)
	tokenString := r.Header.Get("Authorization")
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method")
		}
		return []byte("secret"), nil
	})

	if err != nil {
		log.Fatal(err)
	}
	dbConnection, err := db.GetDBCollection()
	collection := dbConnection.Collection("user")
	if err != nil {
		log.Fatal(err)
	}
	pByID, err := primitive.ObjectIDFromHex(pID)
	// go.mongodb.org/mongo-driver/mongo
	fmt.Println(pID)
	opts := options.FindOneAndUpdate().SetUpsert(true)
	filter := bson.D{{"_id", pByID}}
	update := bson.D{{"$set", &profile}}
	// var updatedDocument bson.M

	if token.Valid {
		err := collection.FindOneAndUpdate(context.Background(), filter, update, opts).Decode(&profile)
		if err != nil {
			fmt.Println("error:", err)
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte(err.Error()))
		} else {
			w.Write([]byte("Updated successfully"))
			fmt.Println(profile)
		}
	}

}

// AddProfileDetails ... when user will create profile first time in user collection by ID it will get updated
func AddProfileDetails(w http.ResponseWriter, r *http.Request) {
	var personalProfle model.PersonalProfile
	body, _ := ioutil.ReadAll(r.Body)
	err := json.Unmarshal(body, &personalProfle)
	if err != nil {
		log.Fatal(err)
	}
	tokenString := r.Header.Get("Authorization")
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method")
		}
		return []byte("secret"), nil
	})
	if err != nil {
		log.Fatal(err)
	}
	conn, err := db.GetDBCollection()
	if err != nil {
		log.Fatal(err)
	}
	col := conn.Collection("user")
	id := mux.Vars(r)["id"]
	fmt.Println("id:", id)
	userID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		log.Fatal(err)
	}
	opts := options.FindOneAndUpdate().SetUpsert(true)
	filter := bson.D{{"_id", userID}}
	update := bson.D{{"$set", personalProfle}}
	var profileDetails model.PersonalProfile
	if token.Valid {
		err = col.FindOneAndUpdate(context.TODO(), filter, update, opts).Decode(&profileDetails)
		if err != nil {
			log.Fatal(err)
		}
		json.NewEncoder(w).Encode(profileDetails)
	}
}

// AddProfileExperience ... update profile experience for existing profile
func AddProfileExperience(w http.ResponseWriter, r *http.Request) {
	var experience model.UserExperience
	body, _ := ioutil.ReadAll(r.Body)
	err := json.Unmarshal(body, &experience)
	if err != nil {
		log.Fatal(err)
	}
	id := mux.Vars(r)["id"]
	tokenString := r.Header.Get("Authorization")
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method")
		}
		return []byte("secret"), nil
	})
	if err != nil {
		log.Fatal(err)
	}
	conn, err := db.GetDBCollection()
	if err != nil {
		log.Fatal(err)
	}
	col := conn.Collection("user")
	fmt.Println("id:", id)
	userID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		log.Fatal(err)
	}
	opts := options.FindOneAndUpdate().SetUpsert(true)
	filter := bson.D{{"_id", userID}}
	update := bson.D{{"$set", experience}}
	var profileExperience model.UserExperience
	if token.Valid {
		err = col.FindOneAndUpdate(context.TODO(), filter, update, opts).Decode(&profileExperience)
		if err != nil {
			log.Fatal(err)
		}
		json.NewEncoder(w).Encode(profileExperience)
	}
}

// AddProfileEducation ... update profile education for existing profile
func AddProfileEducation(w http.ResponseWriter, r *http.Request) {
	var education model.ProfileEducation
	body, _ := ioutil.ReadAll(r.Body)
	err := json.Unmarshal(body, &education)
	if err != nil {
		log.Fatal(err)
	}
	id := mux.Vars(r)["id"]
	tokenString := r.Header.Get("Authorization")
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method")
		}
		return []byte("secret"), nil
	})
	if err != nil {
		log.Fatal(err)
	}
	conn, err := db.GetDBCollection()
	if err != nil {
		log.Fatal(err)
	}
	col := conn.Collection("user")
	fmt.Println("id:", id)
	userID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		log.Fatal(err)
	}
	opts := options.FindOneAndUpdate().SetUpsert(true)
	filter := bson.D{{"_id", userID}}
	update := bson.D{{"$set", education}}
	var profileEducation model.ProfileEducation
	if token.Valid {
		err = col.FindOneAndUpdate(context.TODO(), filter, update, opts).Decode(&profileEducation)
		if err != nil {
			log.Fatal(err)
		}
		json.NewEncoder(w).Encode(profileEducation)
	}
}
