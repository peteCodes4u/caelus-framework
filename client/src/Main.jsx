// the Main.jsx file is the entry point for the client side application. This file renders the App component.

// import ReactDom for rendering the application to the DOM
// import React from 'react' for using React features
import ReactDom from 'react-dom/client';

// import createBrowserRouter and RouterProvider for routing
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// import app and pages for the application
import App from './App.jsx';
import Page1 from './pages/Page1.jsx';
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
                }, 
            ]
        },
]);

ReactDom.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
);