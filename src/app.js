const express = require("express");
const connectDB = require("./config/database.js");
const app = express();
const cookieParser = require("cookie-parser");


app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth.js");
const profileRouter = require("./routes/profile.js");
const requestRouter = require("./routes/request.js");
const userRouter = require("./routes/user.js");

app.use("/", authRouter, profileRouter, requestRouter, userRouter);


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


