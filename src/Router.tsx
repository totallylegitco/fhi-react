import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { Box } from '@mantine/core';
import { HomePage } from './pages/Home.page';
import { AppealPage } from './pages/appeal/Appeal.page';
import { Header } from './components/Header/Header';
import classes from './pages/Layout.module.css';

const Layout = () => (
  <>
    <Header />

    <div className={classes.homePage}>
      <Box className={classes.contentBox}>
        <main style={{ position: 'relative' }}>
          <Outlet />
        </main>

        <footer>{/* Add your footer content here */}</footer>
      </Box>
    </div>
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
