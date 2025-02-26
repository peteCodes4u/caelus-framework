// this file establishes the authentication logic for the server. The auth.js file will be used to create a token for the user when they log in or sign up. 
// The token will be used to authenticate the user when they make requests to the server. 
// The auth.js file will also be used to verify the token when the user makes requests to the server. 
// The auth.js file will be used in the resolvers.js file to authenticate the user when they make requests to the server.

// establish .env file to store sensitive data and use the dotenv package to read the .env file
require('dotenv').config();

// import the GraphQLError class from the graphql package for error handling
const { GraphQLError } = require('graphql');

// import the jsonwebtoken package to create and verify tokens
const jwt = require('jsonwebtoken');

// create a secret for the token
const secret = process.env.JWT_SECRET;

// establish the token longevity
const expiration = '2h';

module.exports = {
    AuthenticationError: new GraphQLError ('User can not be authenticated.', {
        extensions: {
            code: 'UNAUTHENTICATED'
        },
    }),

    signToken: function({ name, email, _id }) {
        const payload = { name, email, _id };

        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    },

    authMiddleware: function({ req }) {
        // token is normally sent in the header of the request
        let token = req.body.token || req.query.token || req.headers.authorization;

        // if the token exists, remove the 'Bearer' string from the token
        if (req.headers.authorization) {
            token = token
                .split(' ')
                .pop()
                .trim();
        }

        // if the token does not exist, return the request object as is
        if (!token) {
            return req;
        }

        // verify the token and decode the user data
        try {
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            req.user = data;
        } catch {
            console.log('Invalid token');
        }

        // return the request object as is
        return req;
    }
};