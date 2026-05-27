const express = require('express');
const { userAuth } = require('../middleware/auth');
const ConnectionRequest = require('../models/connectionRequest');
const userRouter = express.Router();
const User = require("../models/user");

const SAFE_USER_DATA = "firstName lastName photoUrl age gender about skills";

userRouter.get("/user/request/received",
    userAuth ,
    async(req,res) => {
        try {
            
            
            const loggedInUser = req.user;

            const connectionRequests = await ConnectionRequest.find({
                toUserId : loggedInUser._id ,
                status : "interested",
            }).populate(
                "fromUserId",
                SAFE_USER_DATA
            );

            res.json({
                message : "Data Fetched Successfully..!",
                data : connectionRequests,
            });

        } catch (err) {
            res.status(400).json({message : err.message});
        }
     });

userRouter.get("/user/connections",userAuth, async(req,res) => {
    try {
        const loggedInUser = req.user;

        const connectionRequests = await ConnectionRequest.find({
            $or : [{
                toUserId : loggedInUser._id,
                status : "accepted"
            },{
                fromUserId : loggedInUser._id,
                status : "accepted"
            }]
        }).populate("fromUserId",SAFE_USER_DATA)
          .populate("toUserId",SAFE_USER_DATA);  

        const data = connectionRequests.map((row) => {
            if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
                return row.toUserId;
            }
                return row.fromUserId;
        });
        res.json({data});

    } catch (err) {
        res.send(400).json({
            message : err.message
        })
    }
})

userRouter.get("/feed",
    userAuth,
    async(req,res) => {
        try {
            const loggedInUser = req.user;

            const page = parseInt(req.query.page) || 1;
            let limit = parseInt(req.query.limit) || 10;
            limit = limit > 50 ? 50 :limit;
            
            const skip = (page-1)*limit;

            const connectionRequests = await ConnectionRequest.find({
                $or : [
                   { fromUserId : loggedInUser._id} ,
                    {toUserId : loggedInUser._id},
                ]
            }).select("fromUserId toUserId");

            const hideUserFromFeed = new Set();
            connectionRequests.forEach((req)=> {
                hideUserFromFeed.add(req.fromUserId.toString());
                hideUserFromFeed.add(req.toUserId.toString());
            });

            const users = await User.find({
             $and : [
              { _id : { $nin : Array.from(hideUserFromFeed)}},
              {_id : { $ne: loggedInUser._id}},
            ]
            }).select(SAFE_USER_DATA).
            skip(skip)
            .limit(limit);

            res.send(users);

        } catch (err) {
            res.status(400).json({message : err.message});
        }
});

module.exports = userRouter;
