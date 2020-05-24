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
	ID         primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Username   string             `json:"username,omitempty" bson:"username,omitempty"`
	FirstName  string             `json:"firstname,omitempty" bson:"firstname,omitempty"`
	LastName   string             `json:"lastname,omitempty" bson:"lastname,omitempty"`
	Email      string             `json:"email,omitempty" bson:"email,omitempty"`
	Type       string             `json:"type,omitempty" bson:"type,omitempty"`
	Role       string             `json:"role,omitempty" bson:"role,omitempty"`
	Company    string             `json:"company,omitempty" bson:"company,omitempty"`
	Location   string             `json:"location,omitempty" bson:"location,omitempty"`
	Skills     []string           `json:"skills,omitempty" bson:"skills,omitempty"`
	Portfolio  string             `json:"portfolio,omitempty" bson:"portfolio,omitempty"` //linke social platform like github
	About      string             `json:"about,omitempty" bson:"about,omitempty"`         // about your self objective
	Experience []*Experience      `json:"experience,omitempty" bson:"experience,omitempty"`
	Education  Education          `json:"education,omitempty" bson:"education,omitempty"`
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

// PersonalProfile ...
type PersonalProfile struct {
	Role       string        `json:"role,omitempty" bson:"role,omitempty"`
	Company    string        `json:"company,omitempty" bson:"company,omitempty"`
	Location   string        `json:"location,omitempty" bson:"location,omitempty"`
	Skills     []string      `json:"skills,omitempty" bson:"skills,omitempty"`
	Portfolio  string        `json:"portfolio,omitempty" bson:"portfolio,omitempty"`
	About      string        `json:"about,omitempty" bson:"about,omitempty"`
	Experience []*Experience `json:"experience,omitempty" bson:"experience,omitempty"`
	Education  Education     `json:"education,omitempty" bson:"education,omitempty"`
}

// ProfileExperience ...
// type ProfileExperience struct {
// 	Experience UserExperience `json:"experience,omitempty" bson:"experience,omitempty"`
// }

// ProfileEducation ...
type ProfileEducation struct {
	Education []*Education `json:"education,omitempty" bson:"education,omitempty"`
}

// UserExperience ...
type UserExperience struct {
	Experience []*Experience `json:"experience,omitempty" bson:"experience,omitempty"`
}

// Experience ...
type Experience struct {
	Company string `json:"company,omitempty" bson:"company,omitempty"`
	// Position    string `json:"position,omitempty" bson:"position,omitempty"`
	Location    string `json:"location,omitempty" bson:"location,omitempty"`
	Title       string `json:"title,omitempty" bson:"title,omitempty"`
	Description string `json:"description,omitempty" bson:"description,omitempty"`
	Period      string `json:"period,omitempty" bson:"period,omitempty"`
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
