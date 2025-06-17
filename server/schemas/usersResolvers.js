require('dotenv').config();
const User = require('../models/user');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');
const bcrypt = require('bcrypt');
const generateUUID = require('../utils/UUIDGenerator');
const transporter = require('../utils/transporter');
const utilities = require('../utils/utilitites');


const userResolvers = {
        Query: {
            // get a user by userId
            user: async (parent, { userId }) => {
                return User.findOne({ _id: userId });
            },
    
            // get all users
            users: async (parent, args, context) => {
                // check if the user is authenticated
                utilities.authChecker(context);
                return User.find();
            },
    
            // get logged in user's user
            me: async (parent, args, context) => {
                if (context.user) {
                    return User.findOne({ _id: context.user._id });
                }
                throw new AuthenticationError('🤭 Sorry, seems you are not yet logged in, please login and try again, thank you 🤭!');
            },
        },
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
            // the login mutation is used to log in a user. The login mutation takes an email and password as arguments and returns a token and the user's user. The login mutation first checks if a user with the provided email exists. If a user is found, the login mutation checks if the provided password is correct. If the password is correct, the login mutation returns a token and the user's user. If the password is incorrect, the login
            login: async (parent, { email, password }) => {
                const user = await User.findOne({ email });
                // logic for checking if the user exists and if the password is correct
                if (!user) {
                    throw new AuthenticationError('😲 Sorry, we could not find any records that match that user please check your input and try again, thank you 🤭!');
                }
    
                const correctPw = await user.isCorrectPassword(password);
                // logic for if the password is incorrect
                if (!correctPw) {
                    throw new AuthenticationError('😟 Sorry, the password you entered is not correct, please try again or reset your password, thank you 🤭!');
                }
    
                // if the password is correct then a token is created and returned along with the user
                const token = signToken(user);
                return { token, user };
            },
    
            // update a user
            updateUser: async (parent, { name, email }, context) => {
                if (!context.user) throw new AuthenticationError('Not logged in');
    
                // Find the user by ID
                const user = await User.findById(context.user._id);
                if (!user) throw new AuthenticationError('User not found');
    
                // Update fields if provided
                if (name) user.name = name;
                if (email) user.email = email;
    
                // Save the user (triggers pre-save middleware)
                await user.save();
    
                const token = signToken(user);
                return { token, user };
            },
    
            // update a password
            updatePassword: async (parent, { oldPassword, password }, context) => {
                if (!context.user) throw new AuthenticationError('Not logged in');
                const user = await User.findById(context.user._id);
                if (!user) throw new AuthenticationError('User not found');
    
                // Check old password
                const valid = await bcrypt.compare(oldPassword, user.password);
                if (!valid) {
                    return { success: false, message: 'Old password is incorrect.' };
                }
    
                // Update to new password (will be hashed by pre-save middleware)
                user.password = password;
                await user.save();
    
                const token = signToken(user);
                return { token, success: true, message: 'Password updated successfully.' };
            },
    
            // forgot password
            forgotPassword: async (parent, { email }) => {
                const user = await User.findOne({ email });
                if (!user) {
                    return { success: false, message: "Email is not in our records." };
                }
    
                // Generate random password
                const newPassword = generateUUID(16);
                user.password = newPassword;
                await user.save();
                try {
                    await transporter.sendMail({
                        from: `${process.env.EMAIL_FROM} <${process.env.SMTP_SENDER}>`,
                        to: user.email,
                        subject: 'Your New Password',
                        text: `Your new password is: ${newPassword}`
                    });
                } catch (err) {
                    console.error('Email send error:', err);
                    return { success: false, message: "Failed to send email." };
                }
    
                return { success: true, message: "A new password has been sent to your email." };
            },
    
            // delete a user
            deleteUser: async (parent, args, context) => {
                if (context.user) {
                    return User.findByIdAndDelete(context.user._id);
                }
                console.error('🛸 AUTHENTICATION ERROR ENCOUNTERED WHEN DELETING A user 🛸!');
                throw new AuthenticationError('🛸 AUTHENTICATION ERROR ENCOUNTERED WHEN DELETING A user 🛸!');
            },
    
            // verify password
            verifyPassword: async (parent, { password }, context) => {
                if (!context.user) throw new AuthenticationError('Not logged in');
                const user = await User.findById(context.user._id);
                if (!user) return false;
                const valid = await bcrypt.compare(password, user.password);
                return valid;
            },
    
        },
};

module.exports = userResolvers;