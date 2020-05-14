package model

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

// Jobs ...
type Jobs struct {
	JobTitle       string    `json:"jobtitle,omitempty" bson:"jobtitle,omitempty"`
	JobDescription string    `json:"jobdescription,omitempty" bson:"jobdescription,omitempty"`
	Skills         []string  `json:"skills,omitempty" bson:"skills,omitempty"`
	Experience     string    `json:"experience,omitempty" bson:"experience,omitempty"`
	Visa           string    `json:"visa,omitempty" bson:"visa,omitempty"`
	Salary         string    `json:"salary,omitempty" bson:"salary,omitempty"`
	Language       []string  `json:"language,omitempty" bson:"language,omitempty"`
	Education      Education `json:"education,omitempty" bson:"education,omitempty"`
	Country        string    `json:"country,omitempty" bson:"country,omitempty"`
	JobCategory    []string  `json:"jobCategory,omitempty" bson:"jobCategory,omitempty"`
	JobTypes       Fields    `json:"jobtypes,omitempty" bson:"jobtypes,omitempty"`
	CreationDate   time.Time
	Status         string `json:"status,omitempty" bson:"status,omitempty"`
}

// Education ...
type Education struct {
	Bachelors []*DegreeName `json:"bachelors,omitempty" bson:"bachelors,omitempty"`
	Masters   []*DegreeName `json:"masters,omitempty" bson:"masters,omitempty"`
	Doctorate []*DegreeName `json:"doctorate,omitempty" bson:"doctorate,omitempty"`
}

// DegreeName ...
type DegreeName struct {
	Stream         string `json:"stream,omitempty" bson:"stream,omitempty"`
	CollegeName    string `json:"collegename,omitempty" bson:"collegename,omitempty"`
	GraduationYear string `json:"graduationyear,omitempty" bson:"graduationyear,omitempty"`
}

// Fields ...
type Fields struct {
	GlobalMarket    []string `json:"globalmarket,omitempty" bson:"globalmarket,omitempty"`
	Trading         []string `json:"trading,omitempty" bson:"trading,omitempty"`
	AssetManagement []string `json:"assetmanagement,omitempty" bson:"assetmanagement,omitempty"`
	Auditing        []string `json:"auditing,omitempty" bson:"auditing,omitempty"`
}

// Getjobs ...
type Getjobs struct {
	JobID          primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	JobTitle       string             `json:"jobtitle,omitempty" bson:"jobtitle,omitempty"`
	JobDescription string             `json:"jobdescription,omitempty" bson:"jobdescription,omitempty"`
	Skills         []string           `json:"skills,omitempty" bson:"skills,omitempty"`
	Experience     string             `json:"experience,omitempty" bson:"experience,omitempty"`
	Visa           string             `json:"visa,omitempty" bson:"visa,omitempty"`
	Salary         string             `json:"salary,omitempty" bson:"salary,omitempty"`
	Language       []string           `json:"language,omitempty" bson:"language,omitempty"`
	Education      Education          `json:"education,omitempty" bson:"education,omitempty"`
	Country        string             `json:"country,omitempty" bson:"country,omitempty"`
	JobCategory    []string           `json:"jobCategory,omitempty" bson:"jobCategory,omitempty"`
	JobTypes       Fields             `json:"jobTypes,omitempty" bson:"jobTypes,omitempty"`
	CreationDate   time.Time          `jsob:"created_at,omitempty" bson:"created_at,omitempty"`
	Status         string             `json:"status,omitempty" bson:"status,omitempty"`
}

// SavedJobs ...
type SavedJobs struct {
	UserID primitive.ObjectID `json:"_uid,omitempty" bson:"_uid,omitempty"`
	Jobs   Getjobs            `json:"jobs,omitempty" bson:"jobs,omitempty"`
}

// UserSavedJobs ...
// type UserSavedJobs struct {
// 	UserJobs SavedJobs `json:"savedjobs,omitempty" bson:"savedjobs,omitempty"`
// }

// FilterParams ...
type FilterParams struct {
	Salary   string `json:"salary,omitempty" bson:salary,omitempty"`
	JobTitle string `json:"jobtitle,omitempty" bson:jobtitle,omitempty"`
}

//JobSwipe ...
type JobSwipe struct {
	JobTitle      string
	Salary        string
	Language      string
	Visa          bool
	PrimarySkills []string
	Country       string
}

// JobList ...
type JobList struct {
	JobTitle      string
	Salary        string
	Language      string
	Visa          bool
	PrimarySkills []string
	Country       string
}
