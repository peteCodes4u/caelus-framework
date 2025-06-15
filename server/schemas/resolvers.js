// import necessary resolvers
const userResolvers = require('./usersResolvers');

// define the resolvers
const resolvers = {
   Query: {
    ...userResolvers.Query,

   },
   Mutation: {
    ...userResolvers.Mutation,
   },
};

// export the resolvers
module.exports = resolvers;