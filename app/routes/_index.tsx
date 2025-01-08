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
      <div className="w-[80%] h-20 rounded-lg bg-white flex items-center px-4 text-gray-500">
        <div className="flex items-center w-[15%]">
          <img
            className="rounded-full h-7 w-7 "
            src="/user.png"
            alt="avatar"
          ></img>
          <div className="ml-3">Ayelet Cohen</div>
        </div>
        <div className="flex items-center w-[15%] min-w-fit">
          <div className="w-[100%]">
            <div>101</div>
            <div>Interfaced 1 Test Property </div>
          </div>
        </div>
        <div className="flex items-center w-[15%] ml-9">1234566 </div>
        <div className="flex items-center w-[15%]">Amazon</div>
        <div className="flex items-center w-[15%]">Dec 30, 2024</div>
        <div className="flex items-center w-[15%]">
          <div className="rounded-xl bg-[#fae4e1] px-4 py-0.5">Pending</div>
        </div>
        <div className="flex items-center ">
              <img alt="v" src="/vee.png" className="h-7 "></img>
        </div>
      </div>
    </div>
  );
}
