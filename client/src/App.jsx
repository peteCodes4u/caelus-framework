// the app.jsx file is the main file that renders the app.

// Import Styling
import './AppStyle1.css';
import './AppStyle2.css';

// Import useEffect and useState for state management
import { useEffect, useState } from 'react';

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

import NavigationBar from './components/NavigationBar';
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
        const [ isStyle1Active, setIsStyle1Active ] = useState(() => {
            const savedStyle = localStorage.getItem('selectedStyle');
            return savedStyle ? savedStyle === 'app-style1' : true;
        }) 

        //apply the styling classes to the body element via useEffect. 
        useEffect(() => {
            const selectedStyle = isStyle1Active ? "app-style1" : "app-style2"
            document.body.className = selectedStyle;
            localStorage.setItem('selectedStyle', selectedStyle);
        }, [isStyle1Active]); 

        // function to toggle the active stylesheet
        const toggleStyleSheet = () => {
            setIsStyle1Active(!isStyle1Active);
        };

                return (
            <ApolloProvider client={client}>
                    <Header />
                    <NavigationBar toggleStyleSheet={toggleStyleSheet} />
                    <Outlet />
                    <Footer />
            </ApolloProvider>
        );
    };