// import the necessary typeDefs
const userTypeDefs = require('./userTypeDefs');
const profileTypeDefs = require('./profileTypeDefs');

const { gql } = require('apollo-server-express');


const rootTypeDefs = gql `
    type Query
    type Mutation
    
`;
// export the typeDefs
module.exports = [rootTypeDefs, userTypeDefs, profileTypeDefs];

