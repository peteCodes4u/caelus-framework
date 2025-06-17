const { AuthenticationError } = require('apollo-server-express');

// profile not found
function hasProfile(profile) {
    if (!profile) {
        throw new Error('Profile not yet configured');
    }
    
}

module.exports = { 
    hasProfile,

};