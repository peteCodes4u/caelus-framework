// require dotenv package for environment variables
require('dotenv').config();

// use express package to create the server
const express = require('express');

// use apollo-server-express package to create the Apollo Server
const { ApolloServer } = require('@apollo/server');

// use express middleware for Apollo Server
const { expressMiddleware } = require('@apollo/server/express4');

// establish path to serve static files
const path = require('path');

// require authMiddleware from the utils folder
const { authMiddleware } = require('./utils/auth');

// import the typeDefs and resolvers
const { typeDefs, resolvers } = require('./schemas');

// establish the connection to the MongoDB database
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

// Start the Apollo Server and connect it to the Express app
const startApolloServer = async () => {
  try {
    // Start the Apollo Server
    await server.start();

    // Use middleware for parsing JSON and URL-encoded data
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    // Use Apollo Server middleware with authentication context
    app.use('/graphql', expressMiddleware(server, {
      context: authMiddleware,
    }));

    // Serve static assets in production
    if (process.env.NODE_ENV === 'production') {
      app.use(express.static(path.join(__dirname, '../client/dist')));
      app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/dist/index.html'));
      });
    }

    // Connect to the database and start the server
    db.once('open', () => {
      app.listen(PORT, () => {
        console.log(`🌍 Server running on http://localhost:${PORT}`);
        console.log(`🚀 GraphQL endpoint at http://localhost:${PORT}/graphql`);
      });
    });
  } catch (err) {
    console.error('Error starting the server:', err);
  }
};

// Call the function to start the server
startApolloServer();


