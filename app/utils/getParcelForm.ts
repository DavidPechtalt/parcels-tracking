import { getResidentByName } from "~/data/residentsData";
import { Parcel } from "~/types/parcel";
import { isParcelCourier } from "~/types/parcelCourier";
import { ParcelFormError } from "~/types/parcelFormError";
import { isParcelLocation } from "~/types/parcelLocation";
import { Resident } from "~/types/resident";

export default function getParcelFormVal(
  formData: FormData
): Omit<Parcel, "status" | "arrivedIn"> | ParcelFormError {
  const displayId = formData.get("displayId");
  const courier = formData.get("courier");
  const location = formData.get("location");
  const notes = formData.get("notes");
  const residentName = formData.get("resident");
  const id = formData.get("id") || undefined;
  let error: ParcelFormError | undefined;
  if (
    typeof displayId !== "string" ||
    typeof courier !== "string" ||
    typeof location !== "string" ||
    typeof notes !== "string" ||
    typeof residentName !== "string"
  ) {
    error = "input error";
    return error;
  }
  let resident = getResidentByName(residentName);
  if (!isParcelCourier(courier)) {
    error = "courier error";
  } else if (!isParcelLocation(location)) {
    error = "location error";
  } else if (!resident) {
    error = "resident error";
  }
  if (error) return error;
  resident = resident as Resident;
  return {
    id,
    notes,
    resident,
    courier,
    location,
    displayId,
  } as Omit<Parcel, "status" | "arrivedIn">;
}
