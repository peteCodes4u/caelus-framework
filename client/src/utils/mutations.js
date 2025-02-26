// this is the file that will hold the mutations that will be used to make requests to the server to perform CRUD operations on the data in the database.
// mutations are used to make changes to the data in the database using the graphQL server.

// enable graphQl
import { gql } from '@apollo/client';

// this is the mutation that will be used to add a user to the database
// the mutation takes in the user's information as parameters and returns the user's information. Mutations utilize string interpolation to pass in the user's information as parameters.
// NOTE - as the mutations with gql leverages string interpolation, careful attention must be made to the mutations configuration as intellisense will not be available to catch errors.
export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

// this is the mutation will be useed to login the user 
// the mutation takes in the user's email and password as parameters and returns the user's information.
export const LOGIN_USER = gql`
    mutation loginUser($email: String!, $password: String!) {
        loginUser(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;