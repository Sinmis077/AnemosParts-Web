import React from "react";
import { CustomerLayout } from "@/layouts/CustomerLayout";
import { OwnerLayout } from "@/layouts/OwnerLayout";
import { PartDetailsPage } from "@/pages/customer/PartDetailsPage";
import { PartsCatalogPage } from "@/pages/customer/PartsCatalogPage";
import { HomePage } from "@/pages/HomePage";
import { BrandsListPage } from "@/pages/owner/BrandsListPage";
import { CreateBrandPage } from "@/pages/owner/CreateBrandPage";
import { CreateModelPage } from "@/pages/owner/CreateModelPage";
import { CreatePartPage } from "@/pages/owner/CreatePartPage";
import { DashboardPage } from "@/pages/owner/DashboardPage";
import { ModelsListPage } from "@/pages/owner/ModelListPage";
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
      {
        path: '/catalog/item/:id',
        element: <PartDetailsPage />,
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
        path: "/owner/parts/add",
        element: <CreatePartPage />,
      },
      {
        path: "/owner/models",
        element: <ModelsListPage />,
      },
      {
        path: "/owner/models/add",
        element: <CreateModelPage />,
      },
      {
        path: "/owner/brands",
        element: <BrandsListPage />,
      },
      {
        path: "/owner/brands/add",
        element: <CreateBrandPage />
      }
    ],
  },
];
