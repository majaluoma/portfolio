
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './pages/root/Layout';
import ErrorPage from './components/error/ErrorPage';
import { titles } from './data/titles';
import Contact from './pages/Contact';

import Blog from './pages/Blog';
import Portfolio from './pages/Portfolio';
import Test from './pages/Test';
function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout titles={titles}></Layout>,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/',
          element: <Portfolio />,
        },
        {
          path: '/blog',
          element: <Blog />,
        },
        {
          path: '/blog/:year',
          element: <Blog batch/>,
        },
        {
          path: '/contact',
          element: <Contact />,
        },
        {
          path: '/blog/:year/:id',
          element: <Blog single/>,
        },
        {
          path: '/test',
          element: <Test/>,
        },
        
      ],
    }
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App
