package main

import (
	"os"

	"net/http"
)

func getParcels(w http.ResponseWriter, req *http.Request) {
	filename := "data/parcels.json"
	data, err := readJSONFile(filename)

	if err != nil {
		if os.IsNotExist(err) {
			http.Error(w, "file not found", http.StatusNotFound)
		} else {
			http.Error(w, "internal server error", http.StatusInternalServerError)
		}

		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.Write(data)
}


func main() {

	http.HandleFunc("/parcels", getParcels)

	http.ListenAndServe(":8090", nil)
}
