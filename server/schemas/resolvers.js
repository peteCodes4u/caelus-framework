// this file is used to define the resolver functions for the GraphQL queries and mutations.
// resolvers are functions that are responsible for returning the data for a specific field in a query or mutation.

// import the models
const { Profile } = require('../models');

// pull in the signToken function from auth
const { signToken, AuthenticationError } = require('../utils/auth');

// define the resolvers
const resolvers = {
    Query: {
        // get a profile by username
        profile: async (parent, { profileId }) => {
            return Profile.findOne({ _id: profileId });
        },

        // get all profiles
        profiles: async () => {
            return Profile.find();
        },

        // get logged in user's profile
        me: async (parent, args, context) => {
            if (context.user) {
                return Profile.findOne({ _id: context.user._id });
            }
            console.error('🤭 Sorry, seems you are not yet logged in, please login and try again, thank you 🤭!');
            throw AuthenticationError;                        
        },
    },
    // define the mutations
    Mutation: {
        // add a profile
        addProfile: async (parent, { name, email, password }) => {
            // difine the profile properties
            const profile = await Profile.create({ name, email, password });
            // create a token
            const token = signToken(profile);
            // return the token and profile
            return { token, profile };
        },
        // login a profile
        //  define the login mutation
        // the login mutation is used to log in a user. The login mutation takes an email and password as arguments and returns a token and the user's profile. The login mutation first checks if a profile with the provided email exists. If a profile is found, the login mutation checks if the provided password is correct. If the password is correct, the login mutation returns a token and the user's profile. If the password is incorrect, the login
        login: async (parent, { email, password }) => {
            const profile = await Profile.findOne({ email });
            // logic for checking if the profile exists and if the password is correct
            if (!profile) {
                console.error('😲 Sorry, we could not find any records that match that profile please check your input and try again, thank you 🤭!');
                throw new AuthenticationError;
            }

            const correctPw = await profile.isCorrectPassword(password);
            // logic for if the password is incorrect
            if (!correctPw) {
                console.error('😟 Sorry, the password you entered is not correct, please try again or reset your password, thank you 🤭!');
                throw new AuthenticationError;
            }

            // if the password is correct then a token is created and returned along with the profile
            const token = signToken(profile);
            return { token, profile };
        },

        // update a profile
        updateProfile: async (parent, { name, email, password }, context) => {
            if (context.user) {
                return Profile.findByIdAndUpdate(context.user._id, { name, email, password }, { new: true });
            }
            console.error('👽 Authentication Error Encountered when Attempting PROFILE UPDATE 👽!');
            throw new AuthenticationError;
        },
        // delete a profile
        deleteProfile: async (parent, args, context) => {
            if (context.user) {
                return Profile.findByIdAndDelete(context.user._id);
            }
            console.error('🛸 AUTHENTICATION ERROR ENCOUNTERED WHEN DELETING A PROFILE 🛸!');
            throw new AuthenticationError;
        },
    },
};

// export the resolvers
module.exports = resolvers;