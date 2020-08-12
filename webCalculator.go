package main

import (
	"html/template"
	"net/http"
	"path"
	"runtime"

	"github.com/julienschmidt/httprouter"
)

func relativePath() string {
	_, filename, _, ok := runtime.Caller(0)
	if !ok {
		panic("No caller information.")
	}

	return path.Dir(filename)
}

func main() {
	mux := httprouter.New()
	mux.GET("/", index)

	mux.ServeFiles("/css/*filepath", http.Dir(relativePath()+"/public/css/"))
	mux.ServeFiles("/js/*filepath", http.Dir(relativePath()+"/public/js/"))

	server := http.Server{
		Addr:    "127.0.0.1:8080",
		Handler: mux,
	}

	server.ListenAndServe()
}

func index(w http.ResponseWriter, r *http.Request, p httprouter.Params) {
	t := template.Must(template.ParseFiles(relativePath() + "/views/index.html"))
	t.Execute(w, nil)
}
