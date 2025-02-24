import data from "./parcels.json";
import { Parcel } from "../types/parcel";
import { Filters } from "~/types/fitlers";
import axios from "axios";

const parcels = data as Parcel[];
export default parcels;

export async function getParcels(filters: Filters) {
  const parcelsData = (
    await axios.get(`${process.env.DATASERVER_URL}/parcels`, { data: filters })
  ).data as Parcel[] | undefined;

  return parcelsData;
}

export function addParcel(parcel: Parcel) {
  axios.post(`${process.env.DATASERVER_URL}/parcels/new`, parcel)
}

export function pickParcel(parcelId: string) {
  const index = parcels.findIndex((parcel) => parcel.id === parcelId);
  if (index === -1) {
    return false;
  }
  parcels[index].status = "picked up";
  return true;
}

export function findParcel(parcelId: string) {
  return parcels.find((parcel) => parcel.id === parcelId);
}

export function editParcel(parcel: Omit<Parcel, "status" | "arrivedIn">) {
  const parcelIndex = parcels.findIndex((p) => p.id === parcel.id);
  if (parcelIndex === -1) {
    return false;
  }
  const upadatedParcel: Parcel = {
    ...parcel,
    status: parcels[parcelIndex].status,
    arrivedIn: parcels[parcelIndex].arrivedIn,
  };
  parcels[parcelIndex] = upadatedParcel;
}
