import type { Parcel } from "~/types/parcel";
import units from "../data/units.json";
import {
  Form,
  Link,
  Outlet,
  redirect,
  useFetcher,
  useLoaderData,
  useLocation,
  useSubmit,
} from "@remix-run/react";
import { FormEvent } from "react";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { getParcels, pickParcel } from "~/data/parcelsData";

export async function action({ request }: ActionFunctionArgs) {
  const data = await request.formData();
  const id = data.get("status-id");
  if (!id || typeof id !== "string") {
    return Response.json({ error: "id issue" }, { status: 400 });
  }
  if (!pickParcel(id)) {
    return Response.json({ error: "wrong parcel id" }, { status: 400 });
  }

  return redirect(request.url);
}
export async function loader({ request }: LoaderFunctionArgs) {
  const properties = units.map((unit) => `${unit.street} ${unit.number}`);
  const url = new URL(request.url);
  const query = url.searchParams;
  const filters = {
    startDate: query.get("start-date") || undefined,
    endDay: query.get("end-date") || undefined,
    status: query.get("status") || undefined,
    property: query.get("property") || undefined,
  };
  return { parcels: (await getParcels(filters)) || [], properties };
}

export default function Parcels() {
  const loaderData = useLoaderData<typeof loader>();
  const searchQuery = useLocation().search.split("?");
  let urlFilters;
  if (searchQuery.length > 1) {
    urlFilters = searchQuery[1].split("&");
  }
  const { parcels, properties } = loaderData;
  const submit = useSubmit();
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    for (const [key, value] of formData.entries()) {
      !value && formData.delete(key);
    }

    // in the iteration it skips over the third value if I try to delete it! so I need to do it manually.
    !formData.get("status") && formData.delete("status");
    //the property is the third value when choosing end day
    !formData.get("property") && formData.delete("property");
    !formData.get("end-date") && formData.delete("end-date");
    submit(formData);
  }

  function handleReset() {
    const formData = new FormData();
    urlFilters = searchQuery[1].split("&");
    submit(formData);
  }

  return (
    <div className="select-none flex flex-col items-center  h-screen bg-[#071333]">
      <div className="w-[90%] max-w-[1666px] flex justify-between mb-7 px-2 mt-64">
        <div className="flex ">
          <Form
            className="flex space-x-5 items-end"
            onSubmit={(e) => handleSubmit(e)}
            method="get"
            onReset={() => handleReset()}
          >
            <div>
              {" "}
              <div className="flex flex-col">
                <label
                  className="text-white text-sm mb-1 ml-2"
                  htmlFor="start-date"
                >
                  start date
                </label>
                <input
                  defaultValue={
                    urlFilters
                      ?.find((s) => s.includes("start-date"))
                      ?.split("=")[1]
                  }
                  name="start-date"
                  id="start-date"
                  type="date"
                  className="rounded-lg w-40 px-2 h-8 "
                  onChange={(e) => e.target.form?.requestSubmit()}
                />
              </div>
            </div>
            <div>
              <div className="flex flex-col">
                <label
                  htmlFor="end-date"
                  className="text-white text-sm mb-1 ml-2"
                >
                  end date
                </label>
                <input
                  defaultValue={
                    urlFilters
                      ?.find((s) => s.includes("end-date"))
                      ?.split("=")[1]
                  }
                  name="end-date"
                  id="end-date"
                  type="date"
                  className="rounded-lg w-40 px-2 h-8"
                  onChange={(e) => e.target.form?.requestSubmit()}
                />
              </div>
            </div>
            <div>
              <div className="flex flex-col">
                <div
                  // htmlFor="status"
                  className="text-white text-sm mb-1 ml-2"
                >
                  status
                </div>
                <select
                  defaultValue={urlFilters
                    ?.find((s) => s.includes("status"))
                    ?.split("=")[1]
                    ?.split("+")
                    ?.join(" ")}
                  className="rounded-lg w-40 px-2 h-8"
                  onChange={(e) => e.target.form?.requestSubmit()}
                  name="status"
                >
                  <option value="">--status--</option>
                  <option value="picked up">picked up</option>
                  <option value="pending">pending</option>
                </select>
              </div>
            </div>
            <div>
              {" "}
              <div className="flex flex-col">
                <div className="text-white text-sm mb-1 ml-2">property</div>
                <select
                  defaultValue={urlFilters
                    ?.find((s) => s.includes("property"))
                    ?.split("=")[1]
                    ?.split("+")
                    ?.join(" ")}
                  className="rounded-lg w-40 px-2 h-8"
                  onChange={(e) => e.target.form?.requestSubmit()}
                  name="property"
                >
                  <option value="">--building--</option>
                  {properties.map((property) => {
                    return (
                      <option key={property} value={property}>
                        {property}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>{" "}
            <button
              className="bg-red-400 rounded-lg h-8 w-16 flex items-center justify-center text-white"
              type="reset"
            >
              reset
            </button>
          </Form>
        </div>
        <div className="h-8 bg-orange-500 mt-6 px-2  min-w-fit flex justify-center items-center text-white rounded-lg">
          {" "}
          <Link to={`./new`}> New Package</Link>
        </div>
      </div>
      {<Table parcels={parcels} />}
      <Outlet context={parcels} />
      <div className="h-1"></div>
    </div>
  );
}

export function Table({ parcels }: { parcels: Parcel[] }) {
  return (
    <div className="max-w-[90%]   overflow-x-auto flex flex-col  scrollbar py-2 max-h-[65%]">
      <div className="min-w-[1650px] flex w-[1450px] min-h-14 h-14 px-4  mb-4 rounded-lg text-white text-lg bg-black">
        {" "}
        <div className="flex items-center min-w-[214px] ">
          <div className="w-[100%]">Resident</div>
        </div>
        <div className="flex items-center min-w-[214px] ">
          <div className="w-[100%]">Property/Unit</div>
        </div>
        <div className="flex ml-6 items-center min-w-[214px] ">
          <div className="w-[100%] ">ID</div>
        </div>
        <div className="flex ml-8 items-center min-w-[150px] ">
          <div className="w-[100%]">Courier</div>
        </div>
        <div className="flex items-center min-w-[214px] ">
          <div className="w-[100%]">Arrived on</div>
        </div>
        <div className="flex ml-9 items-center min-w-[214px] ">
          <div className="w-[100%]">Status</div>
        </div>
        <div className="flex items-center min-w-[200px] ">
          <div className="w-[100%]">Pick</div>
        </div>
        <div className="flex items-center  min-w-[114px]">
          <div className="w-[100%]">Edit</div>
        </div>
      </div>
      <div className=" w-fit overflow-y-auto scrollbar flex-grow">
        {parcels.map((parcel) => {
          return <TableRow key={parcel.id} parcel={parcel} />;
        })}
      </div>
    </div>
  );
}

export function TableRow({ parcel }: { parcel: Parcel }) {
  const fetcher = useFetcher();
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    if (!confirm("Are you picking the package?")) {
      e.preventDefault();
    }
  }
  return (
    <div className="  min-w-[1650px] w-[1650px] max-w-[1650px] h-20 rounded-lg bg-white flex items-center mr-2 px-4 text-gray-500 mb-1.5 overflow-x-hidden">
      <div className="flex items-center min-w-[214px]">
        <img
          className="rounded-full h-10 "
          src={parcel.resident.img.src}
          alt={parcel.resident.img.alt}
        ></img>
        <div className="ml-3">{parcel.resident.name}</div>
      </div>
      <div className="flex items-center min-w-[214px] ">
        <div className="w-[100%]">
          <div>{parcel.resident.unit.number}</div>
          <div>{parcel.resident.unit.street} </div>
        </div>
      </div>
      <div className="flex items-center  min-w-[214px] ml-6">{parcel.id} </div>
      <div className="flex items-center  min-w-[150px] ml-8">
        {parcel.courier}
      </div>
      <div className="flex items-center  min-w-[214px]">
        {parcel.arrivedIn.split("T")[0]}
      </div>
      <div className="flex items-center ml-9  min-w-[214px]">
        <div
          className={`rounded-xl w-24 flex justify-center  ${
            parcel.status === "pending" ? "bg-red-200" : "bg-green-200"
          }  py-0.5`}
        >
          {parcel.status}
        </div>
      </div>
      <div className="flex items-center min-w-[200px]">
        <fetcher.Form onSubmit={(e) => handleSubmit(e)} method="post">
          {" "}
          <button
            name="status-id"
            value={parcel.id}
            disabled={parcel.status === "picked up"}
            className="disabled:opacity-50"
          >
            <img alt="v" src="/vee.png" className="h-8  rounded-full "></img>
          </button>
        </fetcher.Form>{" "}
      </div>
      <div className="flex items-center min-w-[200px]">
        <Link to={`./${parcel.id}/edit`}>Edit</Link>
      </div>
    </div>
  );
}
