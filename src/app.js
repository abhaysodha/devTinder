const express = require("express");
const connectDB = require("./config/database.js");
const app = express();
const User = require("./models/user.js");

app.use(express.json());

app.post("/signup",async (req,res) =>{
    console.log(req.body);

    const user = new User(req.body);

    try {
   await user.save();
   res.send("User signed up successfully");
    } catch(err){
        res.status(400).send("Internal server error" + err.message);
    }
});


connectDB()
.then(()=>{
    console.log("Database connected successfully");
    app.listen(9999, () =>{
    console.log("server is listing aava dyo on navdi");
});
})
.catch((err)=>{
    console.error("Database can not be connected");
});


