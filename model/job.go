package model

import "go.mongodb.org/mongo-driver/bson/primitive"

type Jobs struct {
	// JobID          primitive.ObjectID `json:"_jobid,omitempty" bson:"J_jobid,omitempty"`
	JobTitle       string
	JobDescription string            `json:"jobdescription,omitempty" bson:"jobdescription,omitempty"`
	Skills         []string          `json:"skills,omitempty" bson:"skills,omitempty"`
	Experience     string            `json:"experience,omitempty" bson:"experience,omitempty"`
	Visa           bool              `json:"visa,omitempty" bson:"visa,omitempty"`
	Salary         string            `json:"salary,omitempty" bson:"salary,omitempty"`
	Language       []string          `json:"language,omitempty" bson:"language,omitempty"`
	Education      map[string]string `json:"education,omitempty" bson:"education,omitempty"`
	Country        string
	JobCategory    []string //"All","normal","startup","premium"
	JobTypes       map[string]*JobType
}
type JobType struct {
	jobFields []string
}

type GetJobs struct {
	JobID          primitive.ObjectID `json:"_jobid,omitempty" bson:"J_jobid,omitempty"`
	JobDescription string             `json:"jobdescription,omitempty" bson:"jobdescription,omitempty"`
	Skills         []string           `json:"skills,omitempty" bson:"skills,omitempty"`
	Experience     string             `json:"experience,omitempty" bson:"experience,omitempty"`
	Visa           bool               `json:"visa,omitempty" bson:"visa,omitempty"`
	Salary         string             `json:"salary,omitempty" bson:"salary,omitempty"`
	Language       []string           `json:"language,omitempty" bson:"language,omitempty"`
}

type JobSwipe struct {
	JobID         primitive.ObjectID `json:"_jobid,omitempty" bson:"J_jobid,omitempty"`
	JobTitle      string
	Salary        string
	Language      string
	Visa          bool
	PrimarySkills []string
	Country       string
}

type JobList struct {
	JobID         primitive.ObjectID `json:"_jobid,omitempty" bson:"J_jobid,omitempty"`
	JobTitle      string
	Salary        string
	Language      string
	Visa          bool
	PrimarySkills []string
	Country       string
}
