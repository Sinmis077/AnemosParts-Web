import { NavBar } from "@/components/customer/NavBar";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

export function CustomerLayout() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={true} />
      <NavBar />

      <Outlet />
    </>
  );
}
