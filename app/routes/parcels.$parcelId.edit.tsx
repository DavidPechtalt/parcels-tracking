import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import ParcelForm from "~/components/parcelForm";
import { findParcel } from "~/data/parcelsData";

export function loader({params}:LoaderFunctionArgs){
    const parcelId = params.parcelId ;
    const parcel = findParcel(parcelId!)

    return parcel
}
export default function ParcelsEdit(){
    const loaderData = useLoaderData<typeof loader>()
    return (<ParcelForm parcelData={loaderData} />)
}