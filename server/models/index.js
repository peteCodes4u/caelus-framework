// this file is used to import all the models in the models folder and export them as an object for use in the express server.

// import necessary models
const User = require('./User'); 
const Profile = require('./Profile');

// export the models as an object for use in the express server
module.exports = { User, Profile }; 
