const express = require("express");

const app = express();

const {adminAuth , userAuth} = require("./middleware/auth");

app.use("/user/login",(req,res) => {
    res.send("user login successfully");
});

app.use("/user/data",userAuth,(req,res) =>{
    res.send("User here is your data buddy");
});

app.use("/admin",adminAuth,(req,res) =>{
    res.send("you are addmin hahahaha do what you like");
})

app.listen(9999, () =>{
    console.log("server is listing aava dyo on navdi");
});