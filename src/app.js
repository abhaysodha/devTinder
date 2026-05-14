const express = require("express");
const connectDB = require("./config/database.js");
const app = express();
const User = require("./models/user.js");
const {validateSignUpData} = require("./utils/validation.js");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const {userAuth} = require("../middleware/auth.js");



app.use(express.json());
app.use(cookieParser());

//signup user and add data of user by post
app.post("/signup",async (req,res) =>{
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

//login of user
app.post("/login",async (req,res) => {
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

app.get("/profile",userAuth, async (req,res) => {
    try{
    const user = req.user;
    res.send(user);
    }
    catch(err){
        res.status(400).send("ERROR : " + err.message);
    }
});

app.post("/sendConnectionRequest",userAuth,async(req,res) => {
    const user = req.user;
    //sending a coonection request
    console.log("sending connection request");

    res.send(user.firstName + " " + " sent the connect request to you!");
});


  
connectDB()
.then(()=>{
    console.log("Database connected successfully");
    app.listen(9999, () =>{
    console.log("server is listing on port 9999");
});
})
.catch((err)=>{
    console.error("Database can not be connected");
});


