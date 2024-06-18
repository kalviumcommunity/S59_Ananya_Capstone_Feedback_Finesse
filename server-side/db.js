const mongoose = require('mongoose');
require("dotenv").config();

const connectToDataBase = async () => {
    try {
        await mongoose.connect(process.env.URI);
        console.log("Mongo DB has successfully connected");
    } 
    catch (error) {
        console.log("There was an error while connecting to Mongo DB", error.message);
    }
};

const disconnectToDataBase = async () => {
    await mongoose.disconnect();
    console.log("Mongoose was disconnected");
};

module.exports = { connectToDataBase, disconnectToDataBase };
