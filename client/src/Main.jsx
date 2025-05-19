// the Main.jsx file is the entry point for the client side application. This file renders the App component.

// import ReactDom for rendering the application to the DOM
// import React from 'react' for using React features
import ReactDom from 'react-dom/client';

// import createBrowserRouter and RouterProvider for routing
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// import app and pages for the application
import App from './App.jsx';
import Page1 from './pages/Page1.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import ErrorPage from './pages/ErrorPage';

// create the router
const router = createBrowserRouter([
        {
            path: '/',
            element:  (
                <>
                <App />
                </>
            ),

            errorElement:   <ErrorPage />,
            // definethe routes for page1
            children: [
                {
                    index: true,
                    element: <Page1 />
                }, {   
                    path: '/page1',
                    element: <Page1 />
                }, {   
                    path: '/login',
                    element: <Login />
                }, {   
                    path: '/signup',
                    element: <Signup />
                }, 
            ]
        },
]);

ReactDom.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
);