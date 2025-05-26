// the app.jsx file is the main file that renders the app.

// Import Styling
import './AppStyle1.css';
import './AppStyle2.css';
import './AppStyle3.css';

// import the context for managing the styles
import { StyleContext } from './StyleContext';

// Import useEffect and useState for state management
import { act, useEffect, useState } from 'react';

// import appolo client for making requests to the server
import { 
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink
} from '@apollo/client';

// import setContext for setting the context of the request
import { setContext } from '@apollo/client/link/context';

// import Outlet for rendering the child components (rendiring nested routes)
import { Outlet } from 'react-router-dom';  

import Header from './components/Header';
import Footer from './components/Footer';

const httpLink = createHttpLink({
    uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {

    const token = localStorage.getItem('id_token');
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    };
});

    const client = new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache(),
    });

    export default function App() {

        // Styling State for local storage
        const [activeStyle, setActiveStyle] = useState(() => localStorage.getItem('selectedStyle') || 'app-style1');

        //apply the styling classes to the body element via useEffect. 
        useEffect(() => {
            document.body.className = activeStyle;
            localStorage.setItem('selectedStyle', activeStyle);
        }, [activeStyle]); 

                return (
            <ApolloProvider client={client}>
            <StyleContext.Provider value={{ activeStyle, setActiveStyle }}>
                    <Header 
                        activeStyle={activeStyle}
                        setActiveStyle={setActiveStyle}
                    />
                    <Outlet />
                    <Footer 
                        activeStyle={activeStyle}
                    />
            </StyleContext.Provider>        
            </ApolloProvider>
        );
    };