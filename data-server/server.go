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
	res, _ := toJSON(parcels)
	w.Write(res)
}
func findParcel(w http.ResponseWriter, req *http.Request) {
	data, _ := readJSONFile("../app/data/parcels.json")
	parcels, _ := parseJSON[Parcel](data)
	var id ParcelID
	unParsedId, err := io.ReadAll(req.Body)

	if err != nil {
		http.Error(w, "bad request", http.StatusBadRequest)
		return
	}
	err = json.Unmarshal(unParsedId, &id)
	if err != nil {
		http.Error(w, "bad request", http.StatusBadRequest)
		return
	}
	idx := find(parcels, func(p Parcel) bool {
		return p.ID == id.ID
	})
	if idx == -1 {
		http.Error(w, "bad request", http.StatusBadRequest)
		return
	}
	res, _ := json.Marshal(parcels[idx])
	w.WriteHeader(http.StatusOK)
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

func pickParcel(w http.ResponseWriter, req *http.Request) {
	data, _ := readJSONFile("../app/data/parcels.json")
	parcels, _ := parseJSON[Parcel](data)
	var id ParcelID
	unParsedId, err := io.ReadAll(req.Body)

	if err != nil {
		http.Error(w, "bad request", http.StatusBadRequest)
		return
	}
	err = json.Unmarshal(unParsedId, &id)
	if err != nil {
		http.Error(w, "bad request", http.StatusBadRequest)
		return
	}
	idx := find(parcels, func(p Parcel) bool {
		return p.ID == id.ID
	})
	if idx == -1 {
		http.Error(w, "bad request", http.StatusBadRequest)
		return
	}
	parcels[idx].Status = "picked up"
	updatedData, err := json.Marshal(parcels)
	if err != nil {
		http.Error(w, "internal server error", http.StatusInternalServerError)
		return
	}

	err = os.WriteFile("../app/data/parcels.json", updatedData, 0)
	if err != nil {
		http.Error(w, "internal server error", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Parcel added successfully"))

}

func main() {

	http.HandleFunc("/parcels", getParcels)

	http.HandleFunc("/parcels/find", findParcel)
	http.HandleFunc("/parcels/new", addParcel)
	http.HandleFunc("/parcels/pick", pickParcel)
	http.ListenAndServe(":8090", nil)
}
