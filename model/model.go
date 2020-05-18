package model

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// User ...
type User struct {
	Username  string `json:"username,omitempty" bson:"username,omitempty"`
	FirstName string `json:"firstname,omitempty" bson:"firstname,omitempty"`
	LastName  string `json:"lastname,omitempty" bson:"lastname,omitempty"`
	Email     string `json:"email,omitempty" bson:"email,omitempty"`
	Password  string `json:"password,omitempty" bson:"password,omitempty"`
	Type      string `json:"type,omitempty" bson:"type,omitempty"`
}

// Getuser ...
type Getuser struct {
	ID        primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Username  string             `json:"username,omitempty" bson:"username,omitempty"`
	FirstName string             `json:"firstname,omitempty" bson:"firstname,omitempty"`
	LastName  string             `json:"lastname,omitempty" bson:"lastname,omitempty"`
	Email     string             `json:"email,omitempty" bson:"email,omitempty"`
	Type      string             `json:"type,omitempty" bson:"type,omitempty"`
	About     string             `json:"about,omitempty" bson:"about,omitempty"`
}

// ResponseResult ...
type ResponseResult struct {
	Error  string `bson:"error,omitempty"`
	Result string `bson:"result,omitempty"`
}

// JWT ...
type JWT struct {
	Token string `bson:"token,omitempty"`
}

// ProfileExperience ...
type ProfileExperience struct {
	Experience UserExperience `json:"experience,omitempty" bson:"experience,omitempty"`
}

// ProfileEducation ...
type ProfileEducation struct {
	Education Education `json:"education,omitempty" bson:"education,omitempty"`
}
type UserExperience struct {
	Experience []*Experience `json:"experience,omitempty" bson:"experience,omitempty"`
}

// Experience ...
type Experience struct {
	Company  string `json:"company,omitempty" bson:"company,omitempty"`
	Position string `json:"position,omitempty" bson:"position,omitempty"`
	Period   string `json:"period,omitempty" bson:"period,omitempty"`
}

// Search -
// 		field,
// 		lookingfor[jobTpe]
// 		country
// 		job category[normal,startup,premium]

// JobType - [
// GlobalMarket:["quantativeAnalyst","financialAnalyst"],
// trading["","",""],
// asesetmanagment["","",""],
// auditiing["","",""],
// businessDevelopment["","",""]
// ]
