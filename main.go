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
	// r.HandleFunc("/auth", controller.Auth).Methods("GET");
	r.HandleFunc("/register", controller.RegisterHandler).Methods("POST")
	r.HandleFunc("/login", controller.LoginHandler).Methods("POST")
	// user profile
	r.HandleFunc("/profile", controller.ProfileHandler).Methods("GET")
	r.HandleFunc("/profiles", controller.GetProfiles).Methods("GET")
	r.HandleFunc("/profile/{id}", controller.GetProfileByID).Methods("GET")
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
	// r.HandleFunc("/download-files", controller.DownloadFile).Methods("GET")
	// matchPercent
	r.HandleFunc("/matchPercent/{userId}/{jobId}", controller.MatchPercent).Methods("GET")
	// add/edit profile experience / education
	r.HandleFunc("/experience", controller.AddProfileExperience).Methods("POST")
	r.HandleFunc("/education", controller.AddProfileEducation).Methods("POST")
	r.HandleFunc("/protected", controller.TokenVerifyMiddleWare(controller.ProtectedEndPoint))
	log.Fatal(http.ListenAndServe(":8080", r))

}
