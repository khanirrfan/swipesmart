package main

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"

	"github.com/swipesmart/controller"
)

func main() {
	r := mux.NewRouter()
	// user regisration/login
	r.HandleFunc("/register", controller.RegisterHandler).Methods("POST")
	r.HandleFunc("/login", controller.LoginHandler).Methods("POST")

	// user profile
	r.HandleFunc("/profile", controller.GetProfile).Methods("GET")
	r.HandleFunc("/profiles", controller.GetProfiles).Methods("GET")
	r.HandleFunc("/getProfileByID/{id}", controller.GetProfileByID).Methods("GET")
	r.HandleFunc("/update-profile/{id}", controller.UpdateProfile).Methods("POST")

	// jobs
	r.HandleFunc("/jobs", controller.GetJobs).Methods("GET")
	r.HandleFunc("/addjob", controller.CreateJobs).Methods("POST")
	r.HandleFunc("/delete-job/{id}", controller.DeleteJobByID).Methods("DELETE")
	r.HandleFunc("/update-job/{id}", controller.UpdateJob).Methods("PUT")

	// applied, saved, rejected
	r.HandleFunc("/savejob/{id}", controller.SaveJobs).Methods("POST")
	r.HandleFunc("/rejectjob/{id}", controller.RejectedJobs).Methods("POST")
	r.HandleFunc("/appliedjob/{id}", controller.AppliedJobs).Methods("POST")

	// get applied, saved, rejected jobs
	r.HandleFunc("/getsavedjobs/{id}", controller.GetSavedJobs).Methods("GET")
	r.HandleFunc("/getappliedjobs/{id}", controller.GetAppliedJobs).Methods("GET")
	r.HandleFunc("/getrejectedjobs/{id}", controller.GetRejectedJobs).Methods("GET")

	// filterjobs
	r.HandleFunc("/filterjobs", controller.FilterJobs).Methods("POST")

	// upload files
	r.HandleFunc("/upload-files", controller.UploadFile).Methods("POST")
	r.HandleFunc("/fetchFiles", controller.FetchCVFiles).Methods("GET")

	// matchPercent
	r.HandleFunc("/matchPercent/{userId}/{jobId}", controller.MatchPercent).Methods("GET")

	// add/edit profile experience / education
	r.HandleFunc("/create-profile/{id}", controller.AddProfileDetails).Methods("PUT")
	r.HandleFunc("/profile/experience/{id}", controller.AddProfileExperience).Methods("PUT")
	r.HandleFunc("/profile/education/{id}", controller.AddProfileEducation).Methods("PUT")

	// success story apis

	// post CRUD
	r.HandleFunc("/post/create/{id}", controller.CreatePost).Methods("POST")
	r.HandleFunc("/post/get/{id}", controller.GetPostByID).Methods("GET")
	r.HandleFunc("/posts/get", controller.GetPost).Methods("GET")
	r.HandleFunc("/post/edit", controller.EditPost).Methods("PUT")
	r.HandleFunc("/post/delete/{id}", controller.DeletePost).Methods("DELETE")

	// like, comment on post
	r.HandleFunc("/post/like/{id}", controller.LikePost).Methods("PUT")
	r.HandleFunc("/post/unlike/{id}", controller.UnlikePost).Methods("PUT")
	r.HandleFunc("/post/comment/{id}", controller.Comment).Methods("POST")
	r.HandleFunc("/post/comment/delete/{id}", controller.DeleteComment).Methods("DELETE")
	r.HandleFunc("/post/comment/edit/{id}", controller.EditComment).Methods("PUT")

	// get cover letters and save them
	r.HandleFunc("/getCoverLetters/{userId}/{jobId}", controller.GetCoverLetters).Methods("GET")
	r.HandleFunc("/readFileByname/{name}", controller.ReadFileByName).Methods("GET")
	// save edited cover letter
	r.HandleFunc("/save/coverletter/{userId}/{jobId}", controller.SaveCoverLetter).Methods("PUT")

	r.HandleFunc("/protected", controller.TokenVerifyMiddleWare(controller.ProtectedEndPoint))
	log.Fatal(http.ListenAndServe(":8080", r))

}
