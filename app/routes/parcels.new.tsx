import { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/react";
import { addParcel } from "~/data/parcelsData";
import { Parcel } from "~/types/parcel";
import ParcelForm from "~/components/parcelForm";
import getParcelFormVal from "~/utils/getParcelForm";
import { v4 as uuidv4 } from "uuid";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const results = getParcelFormVal(formData);
  if (typeof results === "string") {
    return Response.json({ error: results }, { status: 400 });
  }
  results.id = uuidv4();
  addParcel({
    ...results,
    status: "pending",
    arrivedIn: new Date().toISOString(),
  } as Parcel);
  return redirect("..");
}

export default function NewParcel() {
  return <ParcelForm />;
}
