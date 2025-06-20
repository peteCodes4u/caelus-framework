const { gql } = require('apollo-server-express');

module.exports = gql`
  type Profile {
    _id: ID!
    name: String!
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
    addProfile(name: String!, bio: String!, location: String!, newLink: [String]): Profile
    updateProfile(name: String!, bio: String!, location: String!, newLink: [String]): Profile
    deleteProfile: Profile
  }
`;