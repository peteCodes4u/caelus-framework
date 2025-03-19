// the server.js file is used to define the Apollo Server and to connect the Apollo Server to the typeDefs and resolvers. The server.js file is also used to connect to the MongoDB database using Mongoose. The server.js file is the entry point for the server and is used to start the server and listen for incoming requests.

// require dotenv package for environment variables
require('dotenv').config();

// use express package to create the server
const express = require('express');

// use apollo-server-express package to create the Apollo Server
const { ApolloServer } = require('apollo-server-express');

// use express middleware inorder to use the Apollo Server as middleware. Using apollo server as middleware allows the server to be mounted at a specific path in the server's URL
const { expressMiddleware } = require('@apollo/server/express4');

// establish path inorder to use the path.join method to connect to the MongoDB database
const path = require('path');

// require authMiddleware from the utils folder to use the authMiddleware function we have created
const { authMiddleware } = require('./utils/auth');

// import the typeDefs and resolvers inorder to use them in the Apollo Server and to connect the Apollo Server to the MongoDB database
const { typeDefs, resolvers } = require('./schemas');

// establish the connection to the MongoDB database using Mongoose
const db = require('./config/connection');

// establish the port for the server
const PORT = process.env.PORT || 3001;

// create the app using express
const app = express();

// create the Apollo Server using the typeDefs and resolvers
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// start the Apollo Server and connect it to the express app
const startApolloServer = async () => { 
    // start the Apollo Server
    await server.start();

    // expresss urlencoded middleware is used to parse incoming requests with urlencoded payloads
    app.use(express.urlencoded({ extended: false }));

    // require the use of json middleware inorder to parse incoming requests with JSON payloads
    app.use(express.json());

    // use graphql as the endpoint for the Apollo Server with the expressMiddleware and context set to the authMiddleware 
    app.use('/graphql', expressMiddleware( server, {

        // set the context to the authMiddleware inorder to use the authMiddleware function
        context: authMiddleware 
    }));

    // if the server is in production, serve the client/dist directory
    if (process.env.NODE_ENV === 'production') {
        app.use(express.static(path.join(__dirname, '../client/dist')));
    
        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../client/dist/index.html'));
        });
    
    }

    // connect to the MongoDB database
    db.once('open', () => {
        console.log('🌍 Now connected to the caleus framework database 🌍');
    
        // start the server
        app.listen(PORT, () => {
            console.log(`🌟 Now listening on localhost:${PORT} 🌟`);
            console.log(`🚀 Use GraphQL at http://localhost:${PORT}${server.graphqlPath} 🚀`);
        });
    });
};

// execute the start function
startApolloServer();


