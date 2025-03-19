// this file defines the Profile model and exports it for use in the express server. The Profile model is used to store information about a user's profile. The Profile model has a one-to-one relationship with the User model, which is used to store information about a user's account. The Profile model has the following fields:

// enable the use of the mongoose library schema and model so we can create a model for the Profile
const { Schema, model } = require('mongoose');

// leverage the bcrypt library to hash the password
const bcrypt = require('bcrypt');

// define the user schema
const userSchema = new Schema({ });

// this object is used to define the Profile schema as a model
const User = model('User', userSchema);

// export the Profile model for use in the express server
module.exports = User;
