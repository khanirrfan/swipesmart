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
}

// Getuser ...
type Getuser struct {
	ID        primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Username  string             `json:"username,omitempty" bson:"username,omitempty"`
	FirstName string             `json:"firstname,omitempty" bson:"firstname,omitempty"`
	LastName  string             `json:"lastname,omitempty" bson:"lastname,omitempty"`
	Email     string             `json:"email,omitempty" bson:"email,omitempty"`
	Details   Profile            `json:"details,omitempty" bson:"details,omitempty"`
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

// Profile ...
type Profile struct {
	Education  Education  `json:"education,omitempty" bson:"education,omitempty"`
	Experience Experience `json:"experience,omitempty" bson:"experience,omitempty"`
	About      string     `json:"about,omitempty" bson:"about,omitempty"`
}

// Experience ...
type Experience struct {
	Company  string `json:"company,omitempty" bson:"company,omitempty"`
	Position string `json:"position,omitempty" bson:"position,omitempty"`
	Period   string `json:"period,omitempty" bson:"period,omitempty"`
}

// About - string

// Experience -
// 			company: name,
// 			position: name,
// 			expereince,[todate-fromdate],

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
