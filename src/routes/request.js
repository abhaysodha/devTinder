const express = require ("express");
const requestRouter = express.Router();
const {userAuth} = require("../middleware/auth");

requestRouter.post("/sendConnectionRequest",userAuth,async(req,res) => {
    const user = req.user;
    //sending a coonection request
    console.log("sending connection request");

    res.send(user.firstName + " " + " sent the connect request to you!");
});

module.exports = requestRouter;