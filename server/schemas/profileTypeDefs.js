const { gql } = require('apollo-server-express');

module.exports = gql`
  type Profile {
    id: ID!
    bio: String
    location: String
    socialLinks: String
  }
`;