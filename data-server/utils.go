package main

import (
	"fmt"
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
	fmt.Println(data)
	return data, nil
}
// func parseJSON[T any](data []byte) ([]T, error) {
	
// 	var res []T
// 	err := json.Unmarshal(data, &res)
// 	if err != nil {
// 		return res, err
// 	}
// 	fmt.Println(res)
// 	return res, nil
// }