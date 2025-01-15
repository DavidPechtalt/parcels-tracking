import data from "./parcels.json";
import { Parcel } from "../types/parcel";

const parcels = data as Parcel[];
export default parcels;

export function addParcel(parcel: Parcel) {
  parcels.push(parcel);
}
