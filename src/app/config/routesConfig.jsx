import React from 'react';
import { Layout } from '@/layouts/Layout';
import { PartDetailsPage } from '@/pages/PartDetailsPage';
import { PartsCatalogPage } from '@/pages/PartsCatalogPage';
import { HomePage } from '@/pages/HomePage';
import { CartPage } from '@/pages/CartPage.jsx';

export const routesConfig = [
  {
    element: <Layout />,
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
		path: "/cart",
		element: <CartPage />,
	},
];
