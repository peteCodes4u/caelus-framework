const { gql } = require('apollo-server-express');

module.exports = gql`
    type User {
        _id: ID!
        name: String!
        email: String!
        password: String!
        profile: Profile
    }    
    type Auth {
        token: ID!
        user: User
    } 
    type UpdatePasswordResponse {
        success: Boolean!
        message: String
    }
    type ForgotPasswordResponse {
        success: Boolean!
        message: String
    }
    extend type Mutation {
        login(email: String!, password: String!): Auth
        addUser(name: String!, email: String!, password: String!): Auth
        updateUser(name: String, email: String ): Auth
        updatePassword(oldPassword: String!, password: String!): UpdatePasswordResponse
        deleteUser: User
        forgotPassword(email: String!): ForgotPasswordResponse
        verifyPassword(password: String!): Boolean
    }
    extend type Query {
        me: User
        users: [User]
        user(userId: ID!): User
    }
`;
