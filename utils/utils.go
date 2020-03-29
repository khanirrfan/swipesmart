package utils

import (
	"encoding/json"
	"net/http"

	"github.com/jwt-auth/model"
)

func RespondWithError(w http.ResponseWriter, status int, error model.ResponseResult) {
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(error)
}
func ResponseJSON(w http.ResponseWriter, data interface{}) {
	json.NewEncoder(w).Encode(data)
}

func 
