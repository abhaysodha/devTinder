const mongoose  = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required : true,
        minlength : 3,
        maxlength : 20,
    },
    lastName: {
        type: String,
        required : true,
        minlength : 3,
        maxlength : 20,
    },
    emailId: {
        type: String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
        maxlength : 25,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is Not valid" + value);
            }
        },
    },
    password: {
        type: String,
        required : true,
         
    },
    age: {
        type: Number,
        min : 18,
        maxlength : 3,
    },
    gender:  {
        type: String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error ("Gender Data is not valid");
            }
        },
    },
    photoUrl :  {
        type: String,
        default : "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg",
        isUrl : true,
        // isUrl validator
    },
    about :  {
        type: String,
        default : "Hey there! I am using DevTinder.",
        minlength : 3,
         maxlength : 450,
    },
    skills :  {
        type: [String],   
    },

},
    {
        timestamps : true,
    }
);

const User = mongoose.model("User",userSchema);

module.exports = User;


