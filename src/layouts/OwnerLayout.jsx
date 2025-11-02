import { SideNavBar } from "@/components/owner/SideNavBar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

export function OwnerLayout() {
  return (
    <SidebarProvider>
      <Toaster position="top-center" reverseOrder={true} />
      <SideNavBar />

      <Outlet />
    </SidebarProvider>
  );
}
