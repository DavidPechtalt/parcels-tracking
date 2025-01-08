import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center bg-[#071333]">
      <Table />
    </div>
  );
}

export function Table() {
  return (
    <div className="w-[90%]   overflow-x-auto scrollbar py-3">
      <div className="min-w-[1600px] flex w-[1600px] h-10 px-4  mb-4 text-white text-lg">
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
        <div className="flex items-center min-w-[214px] ">
          <div className="w-[100%]">Pick</div>
        </div>
      </div>
      <TableRow />
      <TableRow />
    </div>
  );
}

export function TableRow() {
  return (
    <div className="  min-w-[1600px] w-[1600px] h-20 rounded-lg bg-white flex items-center px-4 text-gray-500 mb-1.5">
      <div className="flex items-center min-w-[214px]">
        <img
          className="rounded-full h-7 w-7 "
          src="/user.png"
          alt="avatar"
        ></img>
        <div className="ml-3">Ayelet Cohen</div>
      </div>
      <div className="flex items-center min-w-[214px] ">
        <div className="w-[100%]">
          <div>101</div>
          <div>Interfaced 1 Test Property </div>
        </div>
      </div>
      <div className="flex items-center  min-w-[214px] ml-9">1234566 </div>
      <div className="flex items-center  min-w-[214px]">Amazon</div>
      <div className="flex items-center  min-w-[214px]">Dec 30, 2024</div>
      <div className="flex items-center  min-w-[214px]">
        <div className="rounded-xl bg-[#fae4e1] px-4 py-0.5">Pending</div>
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
