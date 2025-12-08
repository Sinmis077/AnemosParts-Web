import { NavBar } from '@/components/NavBar';
import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';

export function Layout() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={true} />
      <NavBar />

      <Outlet />
    </>
  );
}
