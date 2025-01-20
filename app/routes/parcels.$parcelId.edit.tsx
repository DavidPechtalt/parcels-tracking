import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { redirect, useLoaderData } from "@remix-run/react";
import ParcelForm from "~/components/parcelForm";
import {  editParcel, findParcel } from "~/data/parcelsData";
import { getResidentByName, residentsNames } from "~/data/residentsData";
import { Parcel } from "~/types/parcel";
import { isParcelCourier } from "~/types/parcelCourier";
import { ParcelFormError } from "~/types/parcelFormError";
import { isParcelLocation } from "~/types/parcelLocation";

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
  if(!resident){
    return Response.json({error}, {status:400})
  }
  const upadatedParcel = {
    id,
    courier,
    location,
    note,
   
    resident,
  };
  editParcel(upadatedParcel as Omit<Parcel,'status'|'arrivedIn'>)
  return redirect("..");
}

export function loader({params}:LoaderFunctionArgs){
    const parcelId = params.parcelId ;
    const parcel = findParcel(parcelId!)

    return parcel
}
export default function ParcelsEdit(){
    const loaderData = useLoaderData<typeof loader>()
    return (<ParcelForm parcelData={loaderData} />)
}