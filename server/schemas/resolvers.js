// import necessary resolvers
const userResolvers = require('./usersResolvers');
const profileResolvers = require('./profileResolvers');
// define the resolvers
const resolvers = {
   Query: {
    ...userResolvers.Query,
    ...profileResolvers.Query,

   },
   Mutation: {
    ...userResolvers.Mutation,
    ...profileResolvers.Mutation,
   },
   Profile: {
    ...profileResolvers.Profile,
   },
   User: {
    ...userResolvers.User,
   },
};

// export the resolvers
module.exports = resolvers;