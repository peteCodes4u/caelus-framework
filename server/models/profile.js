const {Schema, model} = require('mongoose');

const profileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    bio: {
        type: String,
        trim: true,
        required: true,
        validate: { 
            validator: function(v) {
                return v.length <= 750;
            },
            message: props => `Bio is too long! Maximum length is 750 characters.`
        },
        maxlength: 750
    },
    location: {
        type: String,
        trim: true,
        required: true,
        maxlength: 100
    },
    // SocialLinks:{
    //     type: String,
    //     trim: true,
    //     validate: {
    //         validator: function(v) {
    //             return /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/.test(v);
    //         },
    //         message: props => `${props.value} is not a valid URL!`
    //     },
    //     default: {}
    // }
});

const Profile = model('Profile', profileSchema);

module.exports = Profile;