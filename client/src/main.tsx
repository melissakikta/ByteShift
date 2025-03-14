import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App.jsx'
import Entry from './EntryPage.jsx'
import Login from './src/components/SignIn/Login'
import SignUp from './src/components/SignIn/Signup'
import Collection from './src/pages/PostCollection'
import Form from './src/pages/PostForm'
import ErrorPage from './src/pages/Error'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Entry />
      }, {
        path: '/login',
        element: <Login />
      }, {
        path: '/signup',
        element: <SignUp />
      }, {
        path: '/collection',
        element: <Collection />
      }, {
        path: '/form',
        element: <Form />
      }
    ]
  }, 
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <RouterProvider router={router} />
  );
}
