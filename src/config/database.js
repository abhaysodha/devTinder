const mongoose = require("mongoose");

const connectDB = async () => {
   await mongoose.connect(
    "mongodb+srv://abhay1522:SBlzP6HHhhS53GNM@devtinder.fwdbscl.mongodb.net/devTinder"
);
};
module.exports = connectDB;

// SBlzP6HHhhS53GNM

// mongodb+srv://abhay1522:SBlzP6HHhhS53GNM@devtinder.fwdbscl.mongodb.net/

