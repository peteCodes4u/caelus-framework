const { AuthenticationError } = require('apollo-server-express');

// Utility function to check if the user is authenticated
function authChecker(context) {
    if (!context.user) {
        throw new AuthenticationError('please login to continue');
    }
    
    return context.user;
}

function maxlength100(value) {
 return value.length <= 100;
}

function maxlength750(value) {
    return value.length <= 750;
}

function urlValidator(value) {
    return /^(https?:\/\/)[\w.-]+(\.[\w\.-]+)+(\/[\w\-\._~:/?#[\]@!$&'()*+,;=]*)?$/.test(value);
}

module.exports = {
    authChecker,
    maxlength100,
    maxlength750,
    urlValidator
};
