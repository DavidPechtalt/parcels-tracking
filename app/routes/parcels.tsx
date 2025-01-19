import type { Parcel } from "~/types/parcel";
import parcelsData from "../data/parcels.json";
import {
  Link,
  Outlet,
  redirect,
  useFetcher,
  useLoaderData,
} from "@remix-run/react";
import { FormEvent } from "react";
import { ActionFunctionArgs } from "@remix-run/node";
import { pickParcel } from "~/data/parcelsData";

export async function action({ request }: ActionFunctionArgs) {
  const data = await request.formData();
  const id = data.get("status");
  console.log("action")
  console.log(id)
  if (!id || typeof id !== "string") {
    return Response.json({ error: "id issue" }, { status: 400 });
  }
  if(!pickParcel(id)) {
    return Response.json({ error: "wrong parcel id" }, { status: 400 });
  }

  return redirect('.');
}
export function loader() {
  const parcels = parcelsData as Parcel[];
  return parcels;
}

export default function Parcels() {
  const parcels: Parcel[] = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#071333]">
      <div className="flex-grow"></div>
      <div className="w-[100%] flex justify-end mb-7">
        <div className="h-8 bg-orange-500 px-2 mr-24 flex justify-center items-center text-white rounded-lg">
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
    <div className="max-w-[90%]   overflow-x-auto flex flex-col  scrollbar py-2 h-[65%]">
      <div className="min-w-[1450px] flex w-[1450px] min-h-14 h-14 px-4  mb-4 rounded-lg text-white text-lg bg-black">
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
        <div className="flex items-center  ">
          <div className="w-[100%]">Pick</div>
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
    <div className="  min-w-[1450px] w-[1450px] max-w-[1450px] h-20 rounded-lg bg-white flex items-center mr-2 px-4 text-gray-500 mb-1.5 overflow-x-hidden">
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
          className={`rounded-xl w-20 flex justify-center  ${
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
            name="status"
            value={parcel.id}
            disabled={parcel.status === "picked up"}
            className="disabled:opacity-50"
          >
            <img alt="v" src="/vee.png" className="h-8  rounded-full "></img>
          </button>
        </fetcher.Form>{" "}
      </div>
      <div className="flex items-center ml-8 "></div>
    </div>
  );
}
