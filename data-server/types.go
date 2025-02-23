package main

type Parcel struct {
	ID        string   `json:"id"`
	Resident  Resident `json:"resident"`
	Courier   string   `json:"courier"`
	ArrivedIn string   `json:"arrivedIn"`
	Location  string   `json:"location"`
	Status    string   `json:"status"`
}

type Resident struct {
	ID   string `json:"id"`
	Name string `json:"name"`
	Unit Unit   `json:"unit"`
	Img  Image  `json:"img"`
}

type Unit struct {
	ID     string `json:"id"`
	Street string `json:"street"`
	Number string `json:"number"`
}

type Image struct {
	Src string `json:"src"`
	Alt string `json:"alt"`
	ID  string `json:"id"`
}
type Filters struct {
	Startdate *string
	Enddate   *string
	Status    *string
	Property  *string
}
