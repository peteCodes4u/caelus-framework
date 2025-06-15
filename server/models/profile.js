const {Schema, model} = require('mongoose');

const profileSchema = new Schema({
    bio: {
        type: String,
        trim: true,
        maxlength: 750
    },
    location: {
        type: String,
        trim: true,
        maxlength: 100
    },
    SocialLinks:{
        type: Map,
        of: String,
        default: {}
    }
});

const Profile = model('Profile', profileSchema);

module.exports = Profile;