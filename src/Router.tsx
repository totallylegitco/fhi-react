import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { AppealPage } from './pages/appeal/Appeal.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },

  {
    path: '/appeal',
    element: <AppealPage />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
