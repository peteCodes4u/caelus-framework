// the app.jsx file is the main file that renders the app.

import './App.css';
import { 
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink
} from '@apollo/client';

import { setContext } from '@apollo/client/link/context';
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

    function App() {
        return (
            <ApolloProvider client={client}>
                <div className='flex-column justify-flex-start min-100-vh'>
                    <Header />
                    <div className='container'>
                        <Outlet />
                    </div>
                    <Footer />
                </div>
            </ApolloProvider>
        );
    }
export default App;
