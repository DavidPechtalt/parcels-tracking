import { ActionFunctionArgs } from "@remix-run/node";
import { Form, Link, redirect } from "@remix-run/react";
import { isParcelLocation, parcelLocationsArr } from "~/types/parcelLocation";
import {
  isParcelCourier,
  parcelCourierArr,
} from "~/types/parcelCourier";
import { addParcel } from "~/parcelsData";
import { Parcel } from "~/types/parcel";
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const id = formData.get("id");
  const courier = formData.get("courier");
  const location = formData.get("location");
  const note = formData.get("note");
  if (
    typeof id !== "string" ||
    typeof courier !== "string" ||
    !isParcelCourier(courier) ||
    typeof location !== "string" ||
    !isParcelLocation(location) ||
    typeof note !== "string"
  ) {
    return Response.json(
      {
        error: " id, courier and location are required",
      },
      { status: 400 }
    );
  }

  const newParcel = {
    id,
    courier,
    location,
    note,
    arrivedIn: new Date().toISOString(),
    status: "pending",
  };
  addParcel(newParcel as Omit<Parcel, "resident">);
  return redirect("..");
}

export default function NewParcel() {
  return (
    <div className="bg-white h-[100%] w-[30%] absolute right-0 rounded-sm">
      <div className="flex flex-col">
        <div className="h-14 border-b-2 flex items-center">
          <div className="ml-5  mb-2">
            <Link className="text-gray-500 text-2xl" to={"../"}>
              x
            </Link>
            <span className="ml-4 font-bold">Create New Package</span>
          </div>
        </div>
        <div className="flex flex-col p-5">
          <Form method="post">
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
                className="border border-gray-400 rounded-md h-8 w-[100%] "
              />
            </div>
            <div className="mb-8">
              {" "}
              <label htmlFor="courier" className="block">
                <span className="text-xs">*</span>Courier
              </label>
              <select
                name="courier"
                id="courier"
                defaultValue=""
                required
                className="border border-gray-400 rounded-md h-8 w-[100%]"
              >
                <option selected value="">
                  --please select a courier--
                </option>
                {parcelCourierArr.map((courier) => {
                  return (
                    <option key={courier} value={courier}>
                      {courier}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="mb-8">
              {" "}
              <label htmlFor="resident" className="block">
                <span className="text-xs">*</span>Resident / Unit
              </label>
              <input
                // name="resident"
                id="resident"
                type="text"
                // required
                className="border border-gray-400 rounded-md h-8 w-[100%] "
              />
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
              <button className="bg-orange-500 px-4 rounded-lg py-2 text-gray-700">
                submit
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
