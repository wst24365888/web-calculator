package main

import (
	"html/template"
	"log"
	"net/http"
	"os"

	"github.com/julienschmidt/httprouter"
)

func main() {
	// Working Directory
	workingDirectory, err := os.Getwd()
	if err != nil {
		log.Fatal(err)
	}

	mux := httprouter.New()
	mux.GET("/", index)

	mux.ServeFiles("/css/*filepath", http.Dir(workingDirectory+"\\webCalculator\\public\\css\\"))

	mux.ServeFiles("/js/*filepath", http.Dir(workingDirectory+"\\webCalculator\\public\\js\\"))

	server := http.Server{
		Addr:    "127.0.0.1:8080",
		Handler: mux,
	}

	server.ListenAndServe()
}

func index(w http.ResponseWriter, r *http.Request, p httprouter.Params) {
	// Working Directory
	workingDirectory, err := os.Getwd()
	if err != nil {
		log.Fatal(err)
	}

	t := template.Must(template.ParseFiles(workingDirectory + "\\webCalculator\\views\\index.html"))

	t.Execute(w, struct {
		Title string
	}{
		Title: "Calculator",
	})
}
