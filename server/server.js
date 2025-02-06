// Include necessary packages/dependencies
const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const path = require("path");
const db = require("./config/connection");
const typeDefs = require("./schemas/typeDefs");
const resolvers = require("./schemas/resolvers");

// Necessary Middleware for Express and Apollo Server
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse incoming JSON and URL-encoded data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Conditional statement that checks the environment in which the Node app is running
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

// Set up the Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

db.once("open", async () => {
  await server.start();
  app.use("/graphql", expressMiddleware(server));
  app.listen(PORT, () => {
    console.log(`🛸 Now listening on localhost:${PORT}`);
    console.log(`🚀 GraphQL server ready at http://localhost:${PORT}/graphql`);
  });
});
