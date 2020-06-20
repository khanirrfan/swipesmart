package model

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

//  Post ...
type Post struct {
	ID   primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	UID  primitive.ObjectID `json:"_uid,omitempty" bson:"_uid,omitempty"`
	Post string             `json:"post,omitempty" bson:"post,omitempty"`
	Date time.Time          `json:"date,omitempty" bson:"date,omitempty"`
}

// Comment ...
type Comment struct {
}
