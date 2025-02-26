// this is the connection to the database

// this framework leverages mongoDb so we need to import mongoose as a tool to connect to the database
const mongoose = require('mongoose');

// this is the connection to the database
mongoose.connect( process.env.MONGODB_URI || 'mongodb://localhost/127.0.0.1:27017/caleus4wrk');

// export the connection for use in the server
export default mongoose.connection;
