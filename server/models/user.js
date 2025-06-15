// this file defines the Profile model and exports it for use in the express server. The Profile model is used to store information about a user's profile. The Profile model has a one-to-one relationship with the User model, which is used to store information about a user's account. The Profile model has the following fields:

// enable the use of the mongoose library schema and model so we can create a model for the Profile
const { Schema, model } = require('mongoose');

// leverage the bcrypt library to hash the password
const bcrypt = require('bcrypt');
const Profile = require('./profile');

// define the user schema
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, '👾 Please enter a valid e-mail address 👾']
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    profile: { type: Schema.Types.ObjectId, ref: 'Profile', default: null }
});

userSchema.pre('save', async function (next) {
    // if the password has not been modified, skip the hashing process
    if (this.isNew || this.isModified('password')) {
        // salt the password using bcrypt
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();

});

userSchema.methods.isCorrectPassword = async function (password) {
    // compare the password with the hashed password
    return bcrypt.compare(password, this.password);
};

// this object is used to define the Profile schema as a model
const User = model('User', userSchema);

// export the Profile model for use in the express server
module.exports = User;
