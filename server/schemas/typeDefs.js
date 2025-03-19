// this file defines the typeDefs for the GraphQL schema
// typeDefs are the types of data that can be queried or mutated. Note that the typeDefs are written in the GraphQL schema language which uses string interpolation to define the types of data that can be queried or mutated.

const typeDefs = `
    type Query {
        me: User
        users: [User]!
        user(userId: ID!): User
    }

    type User {
        _id: ID
        username: String
        email: String
        password: String
    }
    
    type Auth {
        token: ID!
        user: User
    }
    
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        updateUser(username: String, email: String, password: String): User
        deleteUser: User
    }

`;
// export the typeDefs
module.exports = typeDefs;

