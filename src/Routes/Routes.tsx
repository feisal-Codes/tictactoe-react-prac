import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Products from '../pages/Products';
import { Header } from '../Header';
import App from '../App';
import Game from '../tictac/Game';
import PersonScore from '../PersonScore';
import { Product } from '../pages/Product';
import { ErrorPage } from '../pages/ErrorPage';
import { Home } from '../pages/home';
import { lazy, Suspense } from 'react';
import { ContactPage, ContactPageAction } from '../Forms/contact';
import { SuccessPage } from '../Forms/Success';
import { ContactPageTwo } from '../Forms/ContactTwo';
import Books from '../Books';
import { booksData } from '../Books/data';

const AdminPage = lazy(() => import('../pages/Admin'));
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <Navigate to="Books" /> },

      { path: 'Books', element: <Books data={booksData} /> },
      // {
      //   path: 'contact',
      //   element: <ContactPageTwo />,

      //   // action: ContactPageAction
      // },
      // { path: '/success/:name', element: <SuccessPage /> },
      { path: 'tictac', element: <Game /> },
      // //   { path: 'products', element: <Products /> },
      // //   { path: 'products/:id', element: <Product /> },
      // //   {
      // //     path: 'admin',
      // //     element: (
      // //       <Suspense
      // //         fallback={
      // //           <div
      // //             className="text-center p-5 text-xl
      // //         text-slate-00"
      // //           >
      // //             Loading...
      // //           </div>
      // //         }
      // //       >
      // //         <AdminPage />
      // //       </Suspense>
      // //     ),
      //   },
    ],
  },
]);

export const Routes = () => <RouterProvider router={router} />;
