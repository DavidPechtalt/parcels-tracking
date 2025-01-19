import { ActionFunctionArgs } from "@remix-run/node";
import {  redirect } from "@remix-run/react";
import { isParcelLocation } from "~/types/parcelLocation";
import { isParcelCourier } from "~/types/parcelCourier";
import { addParcel } from "~/data/parcelsData";
import { Parcel } from "~/types/parcel";
import { getResidentByName, residentsNames } from "~/data/residentsData";
import { ParcelFormError } from "~/types/parcelFormError";
import ParcelForm from "~/components/parcelForm";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const id = formData.get("id");
  const courier = formData.get("courier");
  const location = formData.get("location");
  const note = formData.get("note");
  const residentName = formData.get("resident");
  let error: ParcelFormError | undefined
  if (
    typeof id !== "string" ||
    typeof courier !== "string" ||
    typeof location !== "string" ||
    typeof note !== "string" ||
    typeof residentName !== "string"
  ) {
    error="input error"
    return Response.json(
      {
        error
      },
      { status: 400 }
    );
  }
  
  if (!isParcelCourier(courier)) {
    error = "courier error";
  } else if (!isParcelLocation(location)) {
    error = "location error";
  } else if (!residentsNames.includes(residentName)) {
    error = "resident error";
  }
  if (error) return Response.json({ error }, { status: 400 });
  const resident = getResidentByName(residentName);
  const newParcel = {
    id,
    courier,
    location,
    note,
    arrivedIn: new Date().toISOString(),
    status: "pending",
    resident,
  };
  addParcel(newParcel as Parcel);
  return redirect("..");
}

export default function NewParcel() {
 
  return(
    <ParcelForm/>
  )
}
