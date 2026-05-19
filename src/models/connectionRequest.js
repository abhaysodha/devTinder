const mongoose = require("mongoose");

const conectionRequestSchema = new mongoose.Schema({

    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        require : true,
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
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

conectionRequestSchema.index({fromUserId : 1, toUserId : 1});


conectionRequestSchema.pre("save",function () {
    const connectionRequest = this;
    //checking to and from user id is same?

    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("Can't send connection request to self");
    }
    next();
});

const ConnectionRequestModel = new mongoose.model(
    "ConnectionRequest",
    conectionRequestSchema
);

module.exports = ConnectionRequestModel;