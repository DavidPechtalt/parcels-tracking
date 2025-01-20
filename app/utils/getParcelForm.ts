import { getResidentByName } from "~/data/residentsData";
import { isParcelCourier } from "~/types/parcelCourier";
import { ParcelFormError } from "~/types/parcelFormError";
import { isParcelLocation } from "~/types/parcelLocation";
import { Resident } from "~/types/resident";

export default function getParcelFormVal(formData: FormData) {
  const id = formData.get("id");
  const courier = formData.get("courier");
  const location = formData.get("location");
  const note = formData.get("note");
  const residentName = formData.get("resident");
  let error: ParcelFormError | undefined;
  if (
    typeof id !== "string" ||
    typeof courier !== "string" ||
    typeof location !== "string" ||
    typeof note !== "string" ||
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
    courier,
    location,
    note,
    resident,
  };
}
