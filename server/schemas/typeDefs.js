// Sample filler code will input actual real code like User when models are created
const { gql } = require("graphql-tag");

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

module.exports = typeDefs;
