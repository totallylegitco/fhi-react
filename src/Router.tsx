import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { AppealPage } from './pages/appeal/Appeal.page';
import { Header } from './components/Header/Header';

const Layout = () => (
  <>
    <Header />

    <main style={{ position: 'relative' }}>
      <Outlet />
    </main>

    <footer>{/* Add your footer content here */}</footer>
  </>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'appeal',
        element: <AppealPage />,
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
