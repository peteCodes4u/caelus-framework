const { gql } = require("apollo-server-express");

// Sample filler code will input actual real code like User when models are created
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

module.exports = typeDefs;
