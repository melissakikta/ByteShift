import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App.jsx'
import Entry from './Pages/EntryPage'
import Login from './components/SignIn/Login'
import SignUp from './components/SignIn/Signup'
import Collection from './pages/PostCollection'
import Form from './pages/PostForm'
import ErrorPage from './pages/Error'

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
