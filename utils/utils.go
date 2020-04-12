package utils

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/dgrijalva/jwt-go"
	"github.com/jwt-auth/model"
)

func RespondWithError(w http.ResponseWriter, status int, error model.ResponseResult) {
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(error)
}
func ResponseJSON(w http.ResponseWriter, data interface{}) {
	json.NewEncoder(w).Encode(data)
}

func GenerateToken(user model.User) (string, error) {
	var err error
	secret := "secret"
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		// "id":        user.ID,
		"email":     user.Email,
		"lastname":  user.LastName,
		"firstname": user.FirstName,
		"username":  user.Username,
	})
	// spew.Dump(token)

	tokenstring, err := token.SignedString([]byte(secret))
	if err != nil {
		log.Fatal(err)
	}
	return tokenstring, nil
}

// func TokenValidation(w http.ResponseWriter, r *http.Request) {
// 	tokenString := r.Header.Get("Authorization")
// 	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
// 		// Don't forget to validate the alg is what you expect:
// 		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
// 			return nil, fmt.Errorf("Unexpected signing method")
// 		}
// 		return []byte("secret"), nil
// 	})
// 	if err != nil {
// 		log.Fatal(err)
// 	}
// 	fmt.Println(token)
// }
