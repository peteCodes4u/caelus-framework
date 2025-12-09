const {Schema, model} = require('mongoose');
const utilities = require('../utils/utilitites');

const profileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // name:{
    //     type: String,
    //     trim: true,
    //     required: true,
    //     validate: { 
    //         validator: 
    //         utilities.maxlength100, 
    //         message: props => `Name is too long! Maximum length is 100 characters.`
    //     },
    //     maxlength: 100
    // },
    bio: {
        type: String,
        trim: true,
        required: true,
        validate: { 
            validator: 
            utilities.maxlength750,
            message: props => `Bio is too long! Maximum length is 750 characters.`
        },
        maxlength: 750
    },
    location: {
        type: String,
        trim: true,
        required: true,
        validate: { 
            validator: 
            utilities.maxlength100,
            message: props => `Location is too long! Maximum length is 100 characters.`
        },
        maxlength: 100
    },
    socialLinks:[{
        type: String,
        trim: true,
        validate: {
            validator: 
            utilities.urlValidator,
            message: props => `${props.value} is not a valid URL!`
        },
        default: []
    }]
});

const Profile = model('Profile', profileSchema);

module.exports = Profile;