// this file is used to define the resolver functions for the GraphQL queries and mutations.
// resolvers are functions that are responsible for returning the data for a specific field in a query or mutation.

// import the models
const { User } = require('../models');

// pull in the signToken function from auth
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

// define the resolvers
const resolvers = {
    Query: {
        // get a user by username
        user: async (parent, { userId }) => {
            return User.findOne({ _id: userId });
        },

        // get all users
        users: async () => {
            return User.find();
        },

        // get logged in user's user
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id });
            }
            console.error('🤭 Sorry, seems you are not yet logged in, please login and try again, thank you 🤭!');
            throw AuthenticationError('🤭 Sorry, seems you are not yet logged in, please login and try again, thank you 🤭!');                        
        },
    },
    // define the mutations
    Mutation: {
        // add a user
        addUser: async (parent, { name, email, password }) => {
            // difine the user properties
            const user = await User.create({ name, email, password });
            // create a token
            const token = signToken(user);
            // return the token and user
            return { token, user };
        },
        // login a user
        //  define the login mutation
        // the login mutation is used to log in a user. The login mutation takes an email and password as arguments and returns a token and the user's user. The login mutation first checks if a user with the provided email exists. If a user is found, the login mutation checks if the provided password is correct. If the password is correct, the login mutation returns a token and the user's user. If the password is incorrect, the login
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            // logic for checking if the user exists and if the password is correct
            if (!user) {
                console.error('😲 Sorry, we could not find any records that match that user please check your input and try again, thank you 🤭!');
                throw new AuthenticationError('😲 Sorry, we could not find any records that match that user please check your input and try again, thank you 🤭!');
            }

            const correctPw = await user.isCorrectPassword(password);
            // logic for if the password is incorrect
            if (!correctPw) {
                console.error('😟 Sorry, the password you entered is not correct, please try again or reset your password, thank you 🤭!');
                throw new AuthenticationError('😟 Sorry, the password you entered is not correct, please try again or reset your password, thank you 🤭!');
            }

            // if the password is correct then a token is created and returned along with the user
            const token = signToken(user);
            return { token, user };
        },

        // update a user
        updateUser: async (parent, { name, email, password }, context) => {
            if (!context.user) throw new AuthenticationError('Not logged in');
            const updatedUser = await User.findByIdAndUpdate(
                context.user._id,
                { name, email, password },
                { new: true }
            );
            const token = signToken(updatedUser);
            return { token, user: updatedUser };
        },
        // delete a user
        deleteUser: async (parent, args, context) => {
            if (context.user) {
                return User.findByIdAndDelete(context.user._id);
            }
            console.error('🛸 AUTHENTICATION ERROR ENCOUNTERED WHEN DELETING A user 🛸!');
            throw new AuthenticationError('🛸 AUTHENTICATION ERROR ENCOUNTERED WHEN DELETING A user 🛸!');
        },
    },
};

// export the resolvers
module.exports = resolvers;