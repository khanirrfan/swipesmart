package model

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	Username  string `json:"username, omitempty" bson:"username, omitempty"`
	FirstName string `json:"firstname, omitempty" bson:"firstname, omitempty"`
	LastName  string `json:"lastname, omitempty" bson:"lastname, omitempty"`
	Email     string `json:"email, omitempty" bson:"email, omitempty"`
	Password  string `json:"password, omitempty" bson:"password, omitempty"`
	// Token     string             `json:"token, omitempty" bson:"token, omitempty"`
}
type Getuser struct {
	ID        primitive.ObjectID `json:"_id, omitempty" bson:"_id, omitempty"`
	Username  string             `json:"username, omitempty" bson:"username, omitempty"`
	FirstName string             `json:"firstname, omitempty" bson:"firstname, omitempty"`
	LastName  string             `json:"lastname, omitempty" bson:"lastname, omitempty"`
	Email     string             `json:"email, omitempty" bson:"email, omitempty"`
}

type ResponseResult struct {
	Error  string `bson:"error, omitempty"`
	Result string `bson:"result, omitempty"`
}

type JWT struct {
	Token string `bson:"token, omitempty"`
}

type Profile struct {
	Education  map[string]string
	Experience map[string]string
}

// About - string

// Experience -
// 			company: name,
// 			position: name,
// 			expereince, [todate-fromdate],

// Education -
// 			bachlors:
// 				stream: degree name,
// 				collegeName: name,
// 				graduationYear: year
// 			masters:
// 				stream: degree name,
// 				collegeName: name,
// 				graduationYear: year
// 			PHD:
// 				stream: degree name,
// 				collegeName: name,
// 				graduationYear: year

// Search -
// 		field,
// 		lookingfor[jobTpe]
// 		country
// 		job category[normal, startup, premium]

// JobType - [
// GlobalMarket:["quantativeAnalyst", "financialAnalyst"],
// trading["", "", ""],
// asesetmanagment["", "", ""],
// auditiing["", "", ""],
// businessDevelopment["", "", ""]
// ]
