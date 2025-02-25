package main

import (
	"encoding/json"
	"fmt"
	"net/http"

	// "fmt"
	"io"
	"os"
)

func readJSONFile(filename string) ([]byte, error) {

	file, err := os.Open(filename)
	if err != nil {
		return nil, err
	}
	defer file.Close()
	data, err := io.ReadAll(file)
	if err != nil {
		return nil, err
	}
	// fmt.Println(data)
	return data, nil
}
func parseJSON[T any](data []byte) ([]T, error) {

	var res []T
	err := json.Unmarshal(data, &res)
	if err != nil {
		return res, err
	}
	// fmt.Println(res)
	return res, nil
}
func toJSON[T any](data []T) ([]byte, error) {
	jsonData, err := json.Marshal(data)
	if err != nil {
		return nil, err
	}
	return jsonData, nil
}
func filterParcels(parcels []Parcel, filters Filters) []Parcel {
	if filters.Startdate != nil {
		parcels = filter(parcels, func(p Parcel) bool {
			return p.ArrivedIn > *filters.Startdate
		})
	}
	if filters.Enddate != nil {
		parcels = filter(parcels, func(p Parcel) bool {
			return p.ArrivedIn < *filters.Enddate
		})
	}
	if filters.Status != nil {
		parcels = filter(parcels, func(p Parcel) bool {
			return p.Status == *filters.Status
		})
	}
	if filters.Property != nil {
		parcels = filter(parcels, func(p Parcel) bool {
			return fmt.Sprintf("%s %s", p.Resident.Unit.Street, p.Resident.Unit.Number) == *filters.Property
		})
	}
	return parcels
}
func filter[T any](slice []T, predicate func(T) bool) []T {
	var result []T
	for _, value := range slice {
		if predicate(value) {
			result = append(result, value)
		}
	}
	return result
}
func find[T any](slice []T, predicate func(T) bool) int {

	for idx, value := range slice {
		if predicate(value) {
			return idx
		}
	}
	return -1
}
func readBody[T any](req *http.Request, place *T) error {
	data, err := io.ReadAll(req.Body)
	if err != nil {
		return err
	}
	err = json.Unmarshal(data, place)
	if err != nil {
		return err
	}
	return nil
}
