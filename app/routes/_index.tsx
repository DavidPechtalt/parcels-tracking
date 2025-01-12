import type { MetaFunction } from "@remix-run/node";
import type { Parcel } from "~/types/parcel";
import parcelsData from "../data/parcels.json";

export const meta: MetaFunction = () => {
  return [{ title: "Parcels Managment" }, { name: "description", content: "" }];
};

export default function Index() {
  const parcels = parcelsData as Parcel[];
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#071333]">
      {<Table parcels={parcels} />}
    </div>
  );
}

export function Table({ parcels }: { parcels: Parcel[] }) {
  return (
    <div className="w-[90%]   overflow-x-auto scrollbar py-3 ">
      <div className="min-w-[1450px] flex w-[1450px] h-10 px-4  mb-4 text-white text-lg">
        {" "}
        <div className="flex items-center min-w-[214px] ">
          <div className="w-[100%]">Resident</div>
        </div>
        <div className="flex items-center min-w-[214px] ">
          <div className="w-[100%]">Property/Unit</div>
        </div>
        <div className="flex ml-9 items-center min-w-[214px] ">
          <div className="w-[100%] ">ID</div>
        </div>
        <div className="flex items-center min-w-[214px] ">
          <div className="w-[100%]">Courier</div>
        </div>
        <div className="flex items-center min-w-[214px] ">
          <div className="w-[100%]">Arrived on</div>
        </div>
        <div className="flex items-center min-w-[214px] ">
          <div className="w-[100%]">Status</div>
        </div>
        <div className="flex items-center  ">
          <div className="w-[100%]">Pick</div>
        </div>
      </div>
      <div className="h-[200px] w-fit overflow-y-auto scrollbar">
        {parcels.map((parcel) => {
          return <TableRow key={parcel.id} parcel={parcel} />;
        })}
      </div>
    </div>
  );
}

export function TableRow({ parcel }: { parcel: Parcel }) {
  return (
    <div className="  min-w-[1450px] w-[1450px] max-w-[1450px] h-20 rounded-lg bg-white flex items-center px-4 text-gray-500 mb-1.5 overflow-x-hidden">
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
      <div className="flex items-center  min-w-[214px] ml-9">{parcel.id} </div>
      <div className="flex items-center  min-w-[214px]">{parcel.courier}</div>
      <div className="flex items-center  min-w-[214px]">{parcel.arrivedIn}</div>
      <div className="flex items-center  min-w-[214px]">
        <div
          className={`rounded-xl ${
            parcel.status === "pending" ? "bg-red-400" : "bg-green-400"
          } px-4 py-0.5`}
        >
          {parcel.status}
        </div>
      </div>
      <div className="flex items-center min-w-[200px]">
        <button>
          <img alt="v" src="/vee.png" className="h-8  rounded-full "></img>
        </button>
      </div>
      <div className="flex items-center ml-8 "></div>
    </div>
  );
}
