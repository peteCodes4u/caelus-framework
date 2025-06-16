const { gql } = require('apollo-server-express');

module.exports = gql`
  type Profile {
    _id: ID!
    bio: String
    location: String
    user: User!
  }

  extend type Query {
    myProfile: Profile
    getProfileByUserId(userId: ID!): Profile
    getAllProfiles: [Profile]
    getProfileByEmail(email: String!): Profile
  }

  extend type Mutation {
    addProfile(bio: String, location: String): Profile
    updateProfile(bio: String, location: String, userId: ID!): Profile
    deleteProfile(userId: ID!): Profile
  }
`;