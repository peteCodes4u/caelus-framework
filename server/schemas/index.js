// this file is used to import all the schemas established in the resolvers and typeDefs folders and export them as an object for use in the express server.
//  The schemas object is then used to define the ApolloServer object in the server/index.js file.

// import necessary schemas
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

// export the schemas as an object for use in the express server
module.exports = { typeDefs, resolvers };