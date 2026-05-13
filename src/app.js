const express = require("express");
const connectDB = require("./config/database.js");
const app = express();
const User = require("./models/user.js");
const {validateSignUpData} = require("./utils/validation.js");
const bcrypt = require("bcrypt");

app.use(express.json());

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
        const isPasswordValid = await bcrypt.compare(password,user.password);

        if(isPasswordValid){
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

// get user by email id
app.get("/user",async (req,res) => {
    const userEmail = req.body.emailId;
    try{
        const users = await User.find({emailId : userEmail});
        if(users.length === 0){
            res.status(404).send("user not found");
        }
        else{
            res.send(users);
        }
    }
    catch (err){
        res.status(400).send("somthing went wrong");
    }
});

//feed api - GET /feed -get all the user from the database
app.get("/feed", async (req,res) =>{
    try{
        const users = await User.find({});
        res.send(users);
    }
    catch(err){
        res.status(400).send("something went wrong");
    }
});

//finde and delete user by userid
app.delete("/user", async (req,res) => {
      const UserId = req.body.UserId;
    try{
        const user = await User.findByIdAndDelete(UserId);

        res.send("user deleted sucsessfully!");
    }
    catch(err){
        res.status(400).send("something went wrong");
    }
});

//update user by userid
app.patch ("/user/:userId",async (req,res) =>{
    const UserId = req.params.userId;
    const data = req.body;
 

    try{
        const ALLOWED_UPADATES = [
        "photoUrl",
        "about",
        "skills",
        "age",
        "lastName"];

    const isUpdateAllowed = Object.keys(data).every((k) => 
        ALLOWED_UPADATES.includes(k));

    if(!isUpdateAllowed){
        throw new Error ("Update not allowed");
        
    }
    if(data?.skills?.length > 10){
        throw new Error("You can add upto 10 skills not more than that");    
    }

    const user = await User.findByIdAndUpdate({_id: UserId},data,{returnDocument: "before",
            runValidators:true,
        });
        console.log(user);
        res.send("user details are updated");
    }
    catch(err){
        res.status(400).send("UPDATE FAILED : " + err.message );
    }
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


