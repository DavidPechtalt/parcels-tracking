import { ParcelCourier } from "./parcelCourier";
import { ParcelLocation } from "./parcelLocation";
import { ParcelStatus } from "./parcelStatus";
import { Resident } from "./resident";

export interface Parcel {
  id: string;
  resident: Resident;
  courier: ParcelCourier;
  arrivedIn: string;
  location: ParcelLocation;
  status: ParcelStatus;
  notes?:string
}
