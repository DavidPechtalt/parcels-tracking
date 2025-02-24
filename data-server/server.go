package main

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
)

func getParcels(w http.ResponseWriter, req *http.Request) {
	data, _ := readJSONFile("../app/data/parcels.json")
	parcels, _ := parseJSON[Parcel](data)
	var filters Filters
	fil, err := io.ReadAll(req.Body)
	if err != nil {
		http.Error(w, "bad request", http.StatusBadRequest)
		return
	}
	err = json.Unmarshal(fil, &filters)
	if err != nil {
		http.Error(w, "bad request", http.StatusBadRequest)
		return
	}
	parcels = filterParcels(parcels, filters)
	res, _ := toJSON[Parcel](parcels)
	w.Write(res)
}
func addParcel(w http.ResponseWriter, req *http.Request) {
	data, _ := readJSONFile("../app/data/parcels.json")
	parcels, _ := parseJSON[Parcel](data)
	var parcel Parcel
	unParsedParcel, err := io.ReadAll(req.Body)

	if err != nil {
		http.Error(w, "bad request", http.StatusBadRequest)
		return
	}
	err = json.Unmarshal(unParsedParcel, &parcel)
	if err != nil {
		http.Error(w, "bad request", http.StatusBadRequest)
		return
	}
	fmt.Println(parcel)
	parcels = append(parcels, parcel)
	updatedData, err := json.Marshal(parcels)
	if err != nil {
		http.Error(w, "internal server error", http.StatusInternalServerError)
		return
	}

	err = os.WriteFile("../app/data/parcels.json", updatedData, 0)
	if err != nil {
		fmt.Println("Error writing the file")
		http.Error(w, "internal server error", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Parcel added successfully"))

}

func main() {

	http.HandleFunc("/parcels", getParcels)

	http.HandleFunc("/parcels/new", addParcel)
	http.ListenAndServe(":8090", nil)
}
