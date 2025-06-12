// the Main.jsx file is the entry point for the client side application. This file renders the App component.

// import ReactDom for rendering the application to the DOM
// import React from 'react' for using React features
import ReactDom from 'react-dom/client';

// import createBrowserRouter and RouterProvider for routing
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// import bootstrap for styling
import 'bootstrap/dist/css/bootstrap.min.css';

// import app and pages for the application
import App from './App.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import ErrorPage from './pages/ErrorPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage.jsx';
import React, { Suspense, lazy } from 'react';
const Page1 = lazy(() => import('./pages/Page1'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));


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
                    element: <Suspense fallback={<div>Loading...</div>}><Page1 /></Suspense>
                }, {
                    path: '/profile/:id',
                    element: <Suspense fallback={<div>Loading...</div>}><ProfilePage /></Suspense>
                }, {
                    path: '/forgot-password',
                    element: <ForgotPasswordPage />,
                },
                {   
                    path: '/login',
                    element: <Page1 />,
                    children: [
                        {
                            index: true,
                            element: <Login />
                        }, 
                    ]
                }, {   
                    path: '/signup',
                    element: <Page1 />,
                    children: [
                        {
                            index: true,
                            element: <Signup />
                        },
                    ]
                }, 
            ]
        },
]);

ReactDom.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
);