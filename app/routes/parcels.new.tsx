import { ActionFunctionArgs } from "@remix-run/node";
import { Form, Link, redirect, useActionData } from "@remix-run/react";
import { isParcelLocation, parcelLocationsArr } from "~/types/parcelLocation";
import { isParcelCourier, parcelCourierArr } from "~/types/parcelCourier";
import { addParcel } from "~/data/parcelsData";
import { Parcel } from "~/types/parcel";
import { v4 as uuidv4 } from "uuid";
import { getResidentByName, residentsNames } from "~/data/residentsData";
import { FormEvent, useState } from "react";
import { ParcelFormError } from "~/types/parcelFormError";

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
  const actionData = useActionData<typeof action>();

  const [courierError, setCourierError] = useState(false);
  const [residentError, setResidentError] = useState(false);
  const [locationError, setLocationError] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    const courier = e.currentTarget.elements.namedItem(
      "courier"
    ) as HTMLInputElement;
    const resident = e.currentTarget.elements.namedItem(
      "resident"
    ) as HTMLInputElement;
    const location = e.currentTarget.elements.namedItem(
      "location"
    ) as HTMLInputElement;

    if (!isParcelCourier(courier.value)) {
      setCourierError(true);
      e.preventDefault();
    } else if (!residentsNames.includes(resident.value)) {
      setResidentError(true);
      e.preventDefault();
    } else if (!isParcelLocation(location.value)) {
      setLocationError(true);
      e.preventDefault();
    }
  }

  return (
    <div className="bg-white h-[100%] w-[460px] absolute right-0 rounded-sm">
      <div className="flex flex-col">
        <div className="h-14 border-b-2 flex items-center">
          <div className="ml-5  mb-2">
            <Link className="text-gray-500 text-2xl" to={".."}>
              x
            </Link>
            <span className="ml-4 font-bold">Create New Package</span>
          </div>
        </div>
        <div className="flex flex-col p-5">
          <Form method="post" onSubmit={handleSubmit}>
            <div className="mb-8">
              {" "}
              <label htmlFor="id" className="block text-sm mb-2">
                <span className="text-xs">*</span>ID
              </label>
              <input
                name="id"
                id="id"
                type="text"
                required
                className="border border-gray-400 rounded-md h-8 w-[100%] px-2"
                value={uuidv4()}
              />
            </div>
            <div className="mb-8">
              {" "}
              <label htmlFor="courier" className="block">
                <span className="text-xs">*</span>Courier
              </label>
              <input
                className="border border-gray-400 rounded-md h-8 w-[100%] px-1"
                type="text"
                required
                name="courier"
                id="courier"
                list="courier-list"
                defaultValue=""
                onFocus={() => {
                  courierError && setCourierError(false);
                }}
              />
              <datalist id="courier-list">
                {" "}
                {parcelCourierArr.map((courier) => {
                  return (
                    <option key={courier} value={courier}>
                      {courier}
                    </option>
                  );
                })}
              </datalist>
              <div
                className={`text-red-500 text-sm ${
                  courierError || actionData?.error === "courier error"
                    ? ""
                    : "hidden"
                }`}
              >
                * courier must be in the list
              </div>
            </div>
            <div className="mb-8">
              <label htmlFor="resident" className="block">
                <span className="text-xs">*</span>Resident
              </label>
              <input
                name="resident"
                id="resident"
                required
                className="border border-gray-400 rounded-md h-8 px-1 w-[100%] flex items-center"
                list="resident-list"
                type="text"
              />
              <datalist id="resident-list">
                {residentsNames.map((residentName) => {
                  return (
                    <option key={Math.random()} value={residentName}>
                      {residentName}
                    </option>
                  );
                })}
              </datalist>
              <div
                className={`text-red-500 text-sm ${
                  residentError || actionData?.error === "resident error"
                    ? ""
                    : "hidden"
                }`}
              >
                * resident must be in the list
              </div>
            </div>
            <div className="mb-8">
              {" "}
              <label htmlFor="location" className="block">
                <span className="text-xs">*</span>location
              </label>
              <select
                name="location"
                id="location"
                defaultValue=""
                required
                className="border border-gray-400 rounded-md h-8 w-[100%]"
              >
                <option selected value="">
                  --please select location--
                </option>
                {parcelLocationsArr.map((location) => {
                  return (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  );
                })}
                <div
                  className={`text-red-500 text-sm ${
                    locationError || actionData?.error === "location error"
                      ? ""
                      : "hidden"
                  }`}
                >
                  * location must be in the list
                </div>
              </select>
            </div>
            <div className="mb-8">
              {" "}
              <label htmlFor="note" className="block">
                Note
              </label>
              <textarea
                name="note"
                id="note"
                className="border-gray-400  w-[100%] rounded-md h-16 outline-gray-700 ring-1 ring-gray-400"
              />
            </div>
            <div className="w-[100%] flex justify-center">
              <button
                className="bg-orange-500 px-4 rounded-lg py-2 text-gray-700"
                type="submit"
              >
                submit
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
