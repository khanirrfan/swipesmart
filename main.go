package main

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/jwt-auth/controller"
)

func main() {
	r := mux.NewRouter()
	r.HandleFunc("/register", controller.RegisterHandler).Methods("POST")
	r.HandleFunc("/login", controller.LoginHandler).Methods("POST")
	r.HandleFunc("/profile", controller.ProfileHandler).Methods("GET")
	r.HandleFunc("/profiles", controller.GetProfiles).Methods("GET")
	r.HandleFunc("/protected", controller.TokenVerifyMiddleWare(controller.ProtectedEndPoint)).Methods("GET")
	log.Fatal(http.ListenAndServe(":8080", r))

}
