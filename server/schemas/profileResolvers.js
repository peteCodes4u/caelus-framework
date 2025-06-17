const Profile = require('../models/profile');
const User = require('../models/user');
const { AuthenticationError } = require('apollo-server-express');

const profileResolvers = {
    Query: {
        getAllProfiles: async (parent, args, context) => {

            // Check if the user is authenticated
            if (!context.user) {
                throw new AuthenticationError('You need to be logged in to view profiles');
            }
            return await Profile.find();
        },

        myProfile: async (parent, args, context) => {
            // Check if the user is authenticated
            if (!context.user) {
                throw new AuthenticationError('You need to be logged in to view your profile');
            }

            // Find the profile associated with the authenticated user
            const profile = await Profile.findOne({ user: context.user._id });

            // If no profile is found, throw an error
            if (!profile) {
                throw new Error('Profile not found');
            }

            return profile;
        },

        // Get a profile by user ID
        getProfileByUserId: async (parent, { userId }) => {
            // Find the profile associated with the given user ID
            const profile = await Profile.findOne({ user: userId });

            // If no profile is found, throw an error
            if (!profile) {
                throw new Error('This user does not yet have a profile configured');
            }

            return profile;
        },

        // Get a profile by user email
        getProfileByEmail: async (parent, { email }, context) => {
            // Check if the user is authenticated
            if (!context.user) {
                throw new AuthenticationError('You need to be logged in to view a profile');
            }
            const user = await User.findOne({ email });
            if (!user) {
                throw new Error('User not found');
            }
            const profile = await Profile.findOne({ user: user._id });
            if (!profile) {
                throw new Error('This user does not yet have a profile configured');
            }
            return profile;
        }
    },
    Mutation: {
        // Create the profile of the currently authenticated user
        addProfile: async (parent, { bio, location }, context) => {

            // Check if the user is authenticated
            if (!context.user) {
                throw new AuthenticationError('You need to be logged in to create a profile');
            }
            // Get the authenticated user's ID
            const userId = context.user._id;

            // Check if the user already has a profile
            const existingProfile = await Profile.findOne({ user: userId });
            if (existingProfile) {
                throw new Error('This user already has a profile configured');
            }

            // Create a new profile
            const profile = await Profile.create({ bio, location, user: userId });

            // Update the user's profile field to reference the new profile
            await User.findByIdAndUpdate(userId, { profile: profile._id });

            return profile;
        },
        // Update the profile of the currently authenticated user
        updateProfile: async (parent, { bio, location }, context) => {
            // Check if the user is authenticated
            if (!context.user) {
                throw new AuthenticationError('You need to be logged in to update your profile');
            }
            // get the authenticated user's ID
            const user = context.user._id;
            // Find the profile by user field and update it
            const profile = await Profile.findOneAndUpdate(
                { user },
                { bio, location },
                { new: true }
            );
            return profile;
        },
        // Delete the profile of the currently authenticated user
        deleteProfile: async (parent, args, context) => {
           
            // Check if the user is authenticated
            if (!context.user) {
                throw new AuthenticationError('You need to be logged in to delete your profile');
            }
             const userId = context.user._id
            // Find the profile associated with the authenticated user
            const profile = await Profile.findOneAndDelete( {user: userId} );

            // If no profile is found, throw an error
            if (!profile) {
                throw new Error('you have not yet configured your profile');
            }

            // remove the reference from the User model
            await User.findByIdAndUpdate(userId, { profile: null });

            return profile;
        }
    },

    // Resolve the user field in the Profile type
    Profile: {
        user: async (profile) => {
            return await User.findById(profile.user);
        }
    }

};
module.exports = profileResolvers
