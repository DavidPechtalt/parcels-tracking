import type { MetaFunction } from "@remix-run/node";
import parcels from "../data/residents.json";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#071333]">
      {isParcelArr(parcels) && <Table parcels={parcels} />}
    </div>
  );
}

export function Table({ parcels }: { parcels: Parcel[] }) {
  return (
    <div className="w-[90%]   overflow-x-auto scrollbar py-3">
     
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
      {parcels.map((parceli) => {
        return <TableRow key={parceli.id} parcel={parceli} />
      })}
    </div>
  );
}

export function TableRow({parcel}: {parcel:Parcel}) {
  return (
    <div className="  min-w-[1450px] w-[1450px] max-w-[1450px] h-20 rounded-lg bg-white flex items-center px-4 text-gray-500 mb-1.5 overflow-x-hidden">
      <div className="flex items-center min-w-[214px]">
        <img
          className="rounded-full h-7 w-7 "
          src={parcel.img.url}
          alt="avatar"
        ></img>
        <div className="ml-3">{parcel.name}</div>
      </div>
      <div className="flex items-center min-w-[214px] ">
        <div className="w-[100%]">
          <div>101</div>
          <div>{parcel.property} </div>
        </div>
      </div>
      <div className="flex items-center  min-w-[214px] ml-9">{parcel.id} </div>
      <div className="flex items-center  min-w-[214px]">{parcel.courier}</div>
      <div className="flex items-center  min-w-[214px]">{parcel.arrivingDate.toString()}</div>
      <div className="flex items-center  min-w-[214px]">
        <div className="rounded-xl bg-[#fae4e1] px-4 py-0.5">{parcel.status}</div>
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

export interface Parcel {
  name: string;
  img: ProfileImg;
  property: string;
  id: string;
  courier: Courier;
  arrivingDate: Date;
  status: "pending" | "taken";
}

export function isParcel(data: Parcel | unknown): data is Parcel {
  if (
    data &&
    typeof data === "object" &&
    "name" in data &&
    typeof data.name === "string" &&
    "courier" in data &&
    isCourier(data.courier) &&
    "img" in data &&
    isProfileImage(data.img)
  ) {
    return true;
  }
  return false;
}
export function isParcelArr(arr: unknown[]): arr is Parcel[] {
  for (const parcel of parcels) {
    if (!isParcel(parcel)) {
      return false;
    }
  }
  return true;
}

export function isCourier(name: Courier | unknown): name is Courier {
  for (const courier of CourierArr) {
    if (courier === name) return true;
  }
  return false;
}
export function isProfileImage(data: ProfileImg | unknown): data is ProfileImg {
  if (
    data &&
    typeof data === "object" &&
    "url" in data &&
    typeof data.url === "string" &&
    "alt" in data &&
    typeof data.alt === "string"
  ) {
    return true;
  }
  return false;
}
export type ProfileImg = {
  url: string;
  alt: string;
};

const CourierArr = ["Amazon", "Ebay", "Pedax", "AliExpress"] as const;
type Courier = (typeof CourierArr)[number];
