import data from "./parcels.json";
import { Parcel } from "../types/parcel";

const parcels = data as Parcel[];
export default parcels;

export function addParcel(parcel: Parcel) {
  parcels.push(parcel);
}

export function pickParcel(parcelId:string){
  const index = parcels.findIndex(parcel => parcel.id === parcelId);
  if(index === -1){
    return false;
  }
  parcels[index].status = "picked up";
  return true;

}

export function findParcel(parcelId:string){
  return parcels.find(parcel => parcel.id === parcelId)
}
