import data from "./parcels.json";
import { Parcel } from "../types/parcel";
import { Filters } from "~/types/fitlers";

const parcels = data as Parcel[];
export default parcels;

export function getParcels(filters: Filters) {
  let filteredParcels = parcels;
  if (filters.startDate) {
    filteredParcels = filteredParcels.filter(
      (parcel) => new Date(parcel.arrivedIn) > new Date(filters.startDate!)
    );
  }
  if (filters.endDate) {
    filteredParcels = filteredParcels.filter(
      (parcel) => new Date(parcel.arrivedIn) > new Date(filters.endDate!)
    );
  }
  if (filters.status) {
    filteredParcels = filteredParcels.filter(
      (parcel) => parcel.status === filters.status
    );
  }
  if (filters.property) {
    console.log();
    filteredParcels = filteredParcels.filter((parcel) => {
      return (
        filters.property ===
        `${parcel.resident.unit.street} ${parcel.resident.unit.number}`
      );
    });
  }

  return filteredParcels;
}

export function addParcel(parcel: Parcel) {
  parcels.push(parcel);
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
