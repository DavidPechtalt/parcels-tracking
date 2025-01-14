import { ActionFunctionArgs } from "@remix-run/node";
import { Form, Link, redirect } from "@remix-run/react";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  console.log(formData.get('courier'));
  return redirect('../')
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
              <input
                name="courier"
                id="courier"
                type="text"
                required
                className="border border-gray-400 rounded-md h-8 w-[100%] "
              />
            </div>
            <div className="mb-8">
              {" "}
              <label htmlFor="resident" className="block">
                <span className="text-xs">*</span>Resident / Unit
              </label>
              <input
                name="resident"
                id="resident"
                type="text"
                required
                className="border border-gray-400 rounded-md h-8 w-[100%] "
              />
            </div>
            <div className="mb-8">
              {" "}
              <label htmlFor="location" className="block">
                <span className="text-xs">*</span>location
              </label>
              <input
                name="location"
                id="location"
                type="text"
                required
                className="border border-gray-400 rounded-md h-8 w-[100%] "
              />
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
