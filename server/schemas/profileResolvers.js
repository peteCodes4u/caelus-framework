const Profile = require('../models/profile');
const User = require('../models/user');
const utilities = require('../utils/utilitites');
const errorHandler = require('../utils/errorHandler');

const profileResolvers = {
    Query: {
        getAllProfiles: async (parent, args, context) => {
            utilities.authChecker(context);
            return await Profile.find();
        },

        myProfile: async (parent, args, context) => {
            // Check if the user is authenticated
            utilities.authChecker(context);

            // Find the profile associated with the authenticated user
            const profile = await Profile.findOne({ user: context.user._id });

            // run error handler to return error if there is an issue with the request
            errorHandler.hasProfile(profile);

            // if no errors return the profile
            return profile;
        },

        // Get a profile by user ID
        getProfileByUserId: async (parent, { userId }) => {
            // Find the profile associated with the given user ID
            const profile = await Profile.findOne({ user: userId });

            // If no profile is found, throw an error
            errorHandler.hasProfile(profile);

            return profile;
        },

        // Get a profile by user email
        getProfileByEmail: async (parent, { email }, context) => {
            // Check if the user is authenticated
            utilities.authChecker(context);
            const user = await User.findOne({ email });
            if (!user) {
                throw new Error('User not found');
            }
            const profile = await Profile.findOne({ user: user._id });
            errorHandler.hasProfile(profile);
            return profile;
        }
    },

    Mutation: {
        // Create the profile of the currently authenticated user
        addProfile: async (parent, { bio, location, newLink }, context) => {

            // Check if the user is authenticated
            utilities.authChecker(context);
            // Get the authenticated user's ID
            const userId = context.user._id;

            // Check if the user already has a profile
            const existingProfile = await Profile.findOne({ user: userId });
            if (existingProfile) {
                throw new Error('This user already has a profile configured');
            }

            // Create a new profile
            const links = Array.isArray(newLink) ? newLink : newLink ? [newLink] : [];
            const profile = await Profile.create({
                 bio, 
                 location, 
                 socialLinks: links, 
                 user: userId 
                });

            // Update the user's profile field to reference the new profile
            await User.findByIdAndUpdate(userId, { profile: profile._id });

            return profile;
        },
        // Update the profile of the currently authenticated user
        updateProfile: async (parent, { bio, location, newLink }, context) => {
            // Check if the user is authenticated
            
            // get the authenticated user's ID
            const user = utilities.authChecker(context);

            const updateFields = {};
            if( bio !== undefined) updateFields.bio = bio;
            if( location !== undefined) updateFields.location = location;

            // when a new link is prorvided, push it to the socialLinks array
            let updateQuery = updateFields;
            if(newLink) {
                updateQuery = {
                    ...updateFields,
                    $push: { socialLinks: newLink }
                };
            }
            const profile = await Profile.findOneAndUpdate(
                { user: user._id },
                updateQuery,
                { new: true,
                  runValidators: true,  
                }
            );
            if(!profile) {
                throw new Error('Please add a profile first');
            }
            return profile;
        },
        // Delete the profile of the currently authenticated user
        deleteProfile: async (parent, args, context) => {
           
            // Check if the user is authenticated
            utilities.authChecker(context);
             const userId = context.user._id
            // Find the profile associated with the authenticated user
            const profile = await Profile.findOneAndDelete( {user: userId} );

            // If no profile is found, throw an error
            errorHandler.hasProfile(profile);
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
