import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Link to={`/parcels`}>Go To Parcels</Link>
    </div>
  
  );
}
