import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { routesConfig } from './app/config/routesConfig';
import { CartProvider } from './app/contexts/CartContext';
import { AuthProvider } from './app/contexts/AuthContext';

const queryClient = new QueryClient();

const router = createBrowserRouter(routesConfig);

function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <CartProvider>
            <RouterProvider router={router} />
          </CartProvider>
        </AuthProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;