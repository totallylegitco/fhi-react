import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { Box } from '@mantine/core';
import { HomePage } from './pages/Home.page';
import { DenialQuestions } from './pages/denial_questions/DenialQuestions.page';
import { Header } from './components/Header/Header';
import classes from './pages/Layout.module.css';
import { AboutUsPage } from './pages/about-us/AboutUs.page';
import { DeleteDataPage } from './pages/delete-data/DeleteData.page';

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
        path: 'denial_questions',
        element: <DenialQuestions />,
      },
      {
        path: 'about-us',
        element: <AboutUsPage />,
      },
      {
        path: 'delete-data',
        element: <DeleteDataPage />,
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
