package controller

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
)

// UploadFile ...
func UploadFile(w http.ResponseWriter, r *http.Request) {
	r.ParseMultipartForm(10 * 1024 * 1024)
	files := r.MultipartForm.File["files"]
	for _, file := range files {
		fmt.Println("File Name:", file.Filename)
		fmt.Println("File Size:", file.Size)
		fmt.Println("File Type:", file.Header.Get("Content-Type"))
		fmt.Println("--------------")
		// save file to server

		f, _ := file.Open()

		tempFile, err := ioutil.TempFile("uploads", "upload-*.png")
		if err != nil {
			log.Fatal(err)
		}
		defer tempFile.Close()

		fileBytes, err := ioutil.ReadAll(f)
		if err != nil {
			log.Fatal(err)
		}
		tempFile.Write(fileBytes)

	}
	fmt.Println("Done uploading")

}
