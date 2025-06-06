// this is the file that will hold the queries that will be used to make requests to the server to get data from the database.
// queries are used to get data from the database using the graphQL server. 

import { gql } from '@apollo/client';

// this is the query that will be used to get the user's information for the logged in user
export const QUERY_ME = gql`
    query me {
        me {
            _id
            name
            email
        }
    }
`;

// this is the query that will be used to get a user's profile information
export const QUERY_USER = gql`
    query profile($name: String!) {
        profile(name: $name) {
            _id
            name
            email
        }
    }
`;

// this is the query that will be used to get all the users in the database
export const QUERY_USERS = gql`
    query users {
        users {
            _id
            name
            email
        }
    }
`;