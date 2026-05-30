const express = require("express");
const connectDB = require("./config/database.js");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth.js");
const profileRouter = require("./routes/profile.js");
const requestRouter = require("./routes/request.js");
const userRouter = require("./routes/user.js");


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());

app.use("/", authRouter, requestRouter, userRouter);
app.use("/profile",profileRouter);

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


