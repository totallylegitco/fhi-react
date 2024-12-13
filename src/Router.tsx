import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { Box, MantineProvider } from '@mantine/core';
import { Header } from './components/Header/Header';
import classes from './pages/Layout.module.css';
import { HomePage } from './pages/homepage/Homepage.page';
import { DenialQuestions } from './pages/denial-questions/DenialQuestions.page';
import { AboutUsPage } from './pages/about-us/AboutUs.page';
import { DeleteDataPage } from './pages/delete-data/DeleteData.page';
import { theme } from './components/Theme/Theme';

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
        path: 'homepage',
        element: <HomePage />,
      },
      {
        path: 'denial-questions',
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
  return (
    <MantineProvider theme={theme}>
      <RouterProvider router={router} />
    </MantineProvider>
  );
}
