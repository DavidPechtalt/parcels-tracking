import data from "./data/parcels.json";
import { Parcel } from "./types/parcel";

const parcels = data as Parcel[];
export default parcels;

export function addParcel(parcel: Omit<Parcel, "resident">) {
  const parcelWithResident: Parcel = {
    ...parcel,
    resident: {
      id: "7265eb88-4fed-4ed7-a19d-fa8907b38083",
      name: "John Jones",
      unit: {
        id: "c607adca-b2f2-4a57-8b40-5b471438f842",
        street: "Valley View Road",
        number: "97",
      },
      img: {
        src: "/1.jpg",
        alt: "Profile picture of Resident 1",
        id: "33760c7d-206f-4633-a21f-fd7de69b27e8",
      },
    },
  };

  parcels.push(parcelWithResident);
}
