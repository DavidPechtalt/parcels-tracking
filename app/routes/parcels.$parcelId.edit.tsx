import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { redirect, useLoaderData } from "@remix-run/react";
import ParcelForm from "~/components/parcelForm";
import { editParcel, findParcel } from "~/data/parcelsData";
import { Parcel } from "~/types/parcel";
import getParcelFormVal from "~/utils/getParcelForm";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const results = getParcelFormVal(formData);
  if (typeof results === "string") {
    return Response.json({ error: results }, { status: 400 });
  }
  editParcel(results as Omit<Parcel, "arrivedIn" | "status">);

  return redirect("..");
}

export function loader({ params }: LoaderFunctionArgs) {
  const parcelId = params.parcelId;
  const parcel = findParcel(parcelId!);

  return parcel;
}
export default function ParcelsEdit() {
  const loaderData = useLoaderData<typeof loader>();
  return <ParcelForm parcelData={loaderData} />;
}
