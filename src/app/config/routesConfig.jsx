import { CustomerLayout } from "@/layouts/CustomerLayout";
import { OwnerLayout } from "@/layouts/OwnerLayout";
import { PartsCatalogPage } from "@/pages/customer/PartsCatalogPage";
import { HomePage } from "@/pages/HomePage";
import { BrandsListPage } from "@/pages/owner/BrandsListPage";
import { DashboardPage } from "@/pages/owner/DashboardPage";
import { PartsWarehousePage } from "@/pages/owner/PartsWarehousePage";

export const routesConfig = [
  {
    element: <CustomerLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/catalog",
        element: <PartsCatalogPage />,
      },
    ],
  },
  {
    element: <OwnerLayout />,
    children: [
      {
        path: "/owner/",
        element: <DashboardPage />,
      },
      {
        path: "/owner/parts",
        element: <PartsWarehousePage />,
      },
      {
        path: "/owner/brands/add",
        element: <BrandsListPage />,
      },
    ],
  },
];
