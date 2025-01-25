// Include necessary packages/dependencies
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const typeDefs = require("./schemas/schema");
const resolvers = require("./resolvers/resolvers");

// Necessary Middleware for Express and Apollo Server
const app = express();
const server = new ApolloServer({ typeDefs, resolvers });

// This will connect the Apollo Server to the Express App
server.applyMiddleware({ app });

const PORT = process.env.PORT || 3001;

mongoose.connect("mongodb://27017/caelus", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("Connected to Caelus Database");
  app.listen(PORT, () => {
    console.log(
      `Server is running on http://localhost:${PORT}${server.graphqlPath}`
    );
  });
});
