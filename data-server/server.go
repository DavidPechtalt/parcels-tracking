package main

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"
)

var data, _ = readJSONFile("../app/data/parcels.json")
var parcels, _ = parseJSON[Parcel](data)

func getParcels(w http.ResponseWriter, req *http.Request) {

	var filters Filters
	if err := readBody(req, &filters); err != nil {
		http.Error(w, "bad request", http.StatusBadRequest)
		return
	}
	parcels = filterParcels(parcels, filters)
	res, _ := toJSON(parcels)
	w.Write(res)
}

func findParcel(w http.ResponseWriter, req *http.Request) {
	var id ParcelID
	if err := readBody(req, &id); err != nil {
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
	var parcel Parcel
	if err := readBody(req, &parcel); err != nil {
		http.Error(w, "bad request", http.StatusBadRequest)
		return
	}
	parcels = append(parcels, parcel)
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Parcel added successfully"))

}

func pickParcel(w http.ResponseWriter, req *http.Request) {
	var id ParcelID
	if err := readBody(req, &id); err != nil {
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
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Parcel added successfully"))

}
func editParcel(w http.ResponseWriter, req *http.Request) {
	var parcel Parcel
	if err := readBody(req, &parcel); err != nil {
		http.Error(w, "bad request", http.StatusBadRequest)
		return
	}
	idx := find(parcels, func(p Parcel) bool {
		return p.ID == parcel.ID
	})
	if idx == -1 {
		http.Error(w, "bad request", http.StatusBadRequest)
		return
	}
	parcel.Status = parcels[idx].Status
	parcel.ArrivedIn = parcels[idx].ArrivedIn
	parcels[idx] = parcel

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Parcel edited successfully"))
}
func main() {
	// Create a new server
	server := &http.Server{Addr: ":8090"}

	// Set up HTTP handlers
	http.HandleFunc("/parcels", getParcels)
	http.HandleFunc("/parcels/find", findParcel)
	http.HandleFunc("/parcels/new", addParcel)
	http.HandleFunc("/parcels/pick", pickParcel)
	http.HandleFunc("/parcels/edit", editParcel)

	// Start the server in a goroutine
	go func() {
		if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			fmt.Printf("ListenAndServe(): %s\n", err)
		}
	}()
	fmt.Println("Server is running on port 8090")

	// Create a channel to listen for interrupt signals
	stop := make(chan os.Signal, 1)
	signal.Notify(stop, os.Interrupt, syscall.SIGTERM)

	// Wait for an interrupt signal
	<-stop
	fmt.Println("Received interrupt signal")

	// Create a context with a timeout for the shutdown
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	// Updating the data before shooting the server
	updatedData, _ := json.Marshal(parcels)
	os.WriteFile("../app/data/parcels.json", updatedData, 0)
	fmt.Println("Data Updated")
	// Attempt to gracefully shut down the server
	fmt.Println("Shutting down the server...")
	if err := server.Shutdown(ctx); err != nil {
		fmt.Printf("Server Shutdown: %s\n", err)
	}
	fmt.Println("Server gracefully stopped")
}
