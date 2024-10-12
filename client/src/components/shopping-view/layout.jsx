import { Outlet } from "react-router-dom";
import ShoppingHeader from "./Header";

export default function ShoppingLayout() {
  return (
    <>
      <div className="flex flex-col bg-white overflow-hidden">
        <ShoppingHeader/>
          <main className="flex flex-col w-full">
            <Outlet/>
          </main>
      </div>
    </>
  )
}
