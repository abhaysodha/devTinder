const mongoose = require("mongoose");
const User = require("../models/user");

const conectionRequestSchema = new mongoose.Schema({

    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
         ref : "User",
        require : true,
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref : "User",
        require : true,
    },
    status:{
        type:String,
        require : true,
        enum : {
           values :  ["ignored","interested","accepted","rejected"],
           message : `{VALUE} is incorrect status type`,
        }
    }
},

{
    timestamps : true,
}
);




conectionRequestSchema.pre("save", function () {
    const connectionRequest = this;
    // checking to and from user id is same

    if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
        throw new Error("Can't send connection request to self");
    }

});
conectionRequestSchema.index({fromUserId : 1, toUserId : 1});

const ConnectionRequestModel = new mongoose.model(
    "ConnectionRequest",
    conectionRequestSchema
);

module.exports = ConnectionRequestModel;