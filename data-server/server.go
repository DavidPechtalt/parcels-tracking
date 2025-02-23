package main

import (
	"encoding/json"
	"io"
	"net/http"
)

func getParcels(w http.ResponseWriter, req *http.Request) {
	data, _ := readJSONFile("../app/data/parcels.json")
	parcels, _ := parseJSON[Parcel](data)
	var filters Filters
	fil, err := io.ReadAll(req.Body)
	if err != nil {
		http.Error(w, "bad request", http.StatusBadRequest)
	}
	err = json.Unmarshal(fil, &filters)
	if err != nil {
		http.Error(w, "bad request", http.StatusBadRequest)
	}
	parcels = filterParcels(parcels, filters)
	res, _ := toJSON[Parcel](parcels)
	w.Write(res)
}

func main() {

	http.HandleFunc("/parcels", getParcels)

	http.ListenAndServe(":8090", nil)
}
