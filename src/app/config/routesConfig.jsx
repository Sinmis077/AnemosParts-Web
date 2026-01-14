import React from 'react';
import { Layout } from '@/layouts/Layout';
import { PartDetailsPage } from '@/pages/PartDetailsPage';
import { PartsCatalogPage } from '@/pages/PartsCatalogPage';
import { HomePage } from '@/pages/HomePage';
import { CartPage } from '@/pages/CartPage.jsx';
import { SuccessPage } from '@/pages/SuccessPage.jsx';
import { CancelPage } from '@/pages/CancelPage.jsx';
import { AccountPage } from '@/pages/AccountPage.jsx';
import { RegisterPage } from '@/pages/RegisterPage.jsx';

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
      {
        path: '/payment/success',
        element: <SuccessPage />,
      },
      {
        path: '/payment/cancel',
        element: <CancelPage />,
      },
      {
        path: '/account',
        element: <AccountPage />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      }
    ],
  },
	{
		path: "/cart",
		element: <CartPage />,
	},
];
