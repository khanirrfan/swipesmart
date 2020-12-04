package model

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

//  Post ...
type Post struct {
	ID       primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	UID      primitive.ObjectID `json:"_uid,omitempty" bson:"_uid,omitempty"`
	Title    string             `json:"title,omitempty" bson:"title,omitempty"`
	Post     string             `json:"post,omitempty" bson:"post,omitempty"`
	Date     time.Time          `json:"date,omitempty" bson:"date,omitempty"`
	Comments []*Comment         `json:"comments,omitempty" bson:"comments,omitempty"`
	Likes    []*Like            `json:"likes,omitempty" bson:"likes,omitempty"`
}

// Comment ...
type Comment struct {
	UID         primitive.ObjectID `json:"_uid,omitempty" bson:"_uid,omitempty"`
	CommnetText string             `json:"commenttext,omitempty" bson:"commenttext,omitempty"`
	Username    string             `json:"username,omitempty" bson:"username,omitempty"`
	Date        time.Time          `json:"date,omitempty" bson:"date,omitempty"`
}

// Like ...
type Like struct {
	UID primitive.ObjectID `json:"_uid,omitempty" bson:"_uid,omitempty"`
}
