const { AuthenticationError } = require('apollo-server-express');

// Utility function to check if the user is authenticated
function authChecker(context) {
    if (!context.user) {
        throw new AuthenticationError('please login to continue');
    }
    
    return context.user;
}

module.exports = {
    authChecker,
};
