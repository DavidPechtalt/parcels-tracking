import { ParcelCourier } from "./parcelCourier";
import { Resident } from "./resident";

export interface Parcel {
    id:string;
    residnent:Resident;
    courier:ParcelCourier; 
    arrivedIn:Date;
    location:Location;
}