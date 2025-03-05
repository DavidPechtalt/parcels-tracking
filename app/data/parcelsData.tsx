import { Parcel } from "../types/parcel";
import { Filters } from "~/types/fitlers";
import axios from "axios";

export async function getParcels(filters: Filters) {
  const parcelsData = (
    await axios.get(`${process.env.DATASERVER_URL}/parcels`, { data: filters })
  ).data as Parcel[] | undefined;

  return parcelsData;
}

export function addParcel(parcel: Parcel) {
  axios.post(`${process.env.DATASERVER_URL}/parcels/new`, parcel);
}

export async function setAsPicked(parcelId: string) {
  const res = await axios.post(`${process.env.DATASERVER_URL}/parcels/pick`, {
    id: parcelId,
  });
  if (res.status != 200) {
    return false;
  }
  return true;
}

export async function findParcel(parcelId: string) {
  const response = await axios.get(
    `${process.env.DATASERVER_URL}/parcels/find`,
    {
      data: { id: parcelId },
    }
  );
  return response.data;
}

export function editParcel(parcel: Omit<Parcel, "status" | "arrivedIn"|"id">) {
  console.log(parcel)
  axios.put(`${process.env.DATASERVER_URL}/parcels/edit`, parcel);
}
