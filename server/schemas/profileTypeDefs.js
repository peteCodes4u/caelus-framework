const { gql } = require('apollo-server-express');

module.exports = gql`
  type Profile {
    _id: ID!
    bio: String!
    location: String!
    socialLinks: [String]
    user: User!
  }

  extend type Query {
    myProfile: Profile
    getProfileByUserId(userId: ID!): Profile
    getAllProfiles: [Profile]
    getProfileByEmail(email: String!): Profile
  }

  extend type Mutation {
    addProfile(bio: String!, location: String!, newLink: [String]): Profile
    updateProfile(bio: String, location: String, newLink: [String], password: String!): Profile
    deleteProfile: Profile
    deleteProfileWPassword(password: String!): Profile
  }
`;