// the Main.jsx file is the entry point for the client side application. This file renders the App component.

import ReactDom from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import ErrorPage from './pages/ErrorPage';

const router = createBrowserRouter([
        {
            path: '/',
            element: <App />,
            errorElement:   <ErrorPage />,
            children: [
                {
                    index: true,
                    element: <Home />
                }, {   
                    path: '/login',
                    element: <Login />
                }, {   
                    path: '/signup',
                    element: <Signup />
                }, {   
                    path: '/me',
                    element: <Profile />

                }
            ]
        },
]);

ReactDom.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
);