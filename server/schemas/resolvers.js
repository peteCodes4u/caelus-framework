// this file is used to define the resolver functions for the GraphQL queries and mutations.
// resolvers are functions that are responsible for returning the data for a specific field in a query or mutation.
require('dotenv').config();

// import the models
const { User } = require('../models');

// pull in the signToken function from auth
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');
const bcrypt = require('bcrypt');
const generateUUID = require('../utils/UUIDGenerator');
const transporter = require('../utils/transporter');
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