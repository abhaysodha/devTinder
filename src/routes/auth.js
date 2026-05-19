const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const {validateSignUpData} = require("../utils/validation.js");
const User = require("../models/user.js");


authRouter.post("/signup",async (req,res) =>{
    try {
    //Validattion of user data
    validateSignUpData(req);

    const {firstName, lastName , emailId , password} = req.body ;

    //Encrypt the password
    const passwordHash = await bcrypt.hash(password,10);
    
    // Creating a new instance of the user model
    const user = new User({
        firstName,
        lastName,
        emailId,
        password : passwordHash,
    });
    
   await user.save();
   res.send("User Signed Up Successfully");
    } catch(err){
        res.status(400).send("ERROR :" + err.message);
    }
});

authRouter.post("/login",async (req,res) => {
    try{
        const {emailId, password} = req.body;

        const user = await User.findOne({emailId : emailId});
        if(!user){
            throw new Error("Invalid Credantials");   
        }
        const isPasswordValid = await user.validatePassword(password);

        if(isPasswordValid){
        //Create a JWT token
        const token = await user.getJWT();

        //Add the tokken into cookie and send the response back to user
        res.cookie("token",token,{
            expires : new Date(Date.now() + 8 * 3600000),
        });
        res.send("Login Successfully!");
        }
        else{
            throw new Error("Invalid Credantials");
        }
    }
    catch(err){
        res.status(400).send("ERROR : " + err.message);
    }
});

authRouter.post("/logout", async (req,res) => {
    res.cookie("token",null,{
        expires:new Date(Date.now()),
    });
    res.send("Logout Successfully!");
});
module.exports = authRouter;