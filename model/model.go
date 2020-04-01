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

type UserId struct {
	ProfileId string `json:"id"`
}
type ResponseResult struct {
	Error  string `bson:"error, omitempty"`
	Result string `bson:"result, omitempty"`
}

type JWT struct {
	Token string `bson:"token, omitempty"`
}
