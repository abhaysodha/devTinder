const mongoose = require("mongoose");

const coonectionRequestSchema = new mongoose.Schema({

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
           message : `${VALUE} is incorrect status type`,
        }
    }
},
{
    timestamps : true,
}
);

const ConnectionRequestModel = new mongoose.model(
    "ConnectionRequest",
    coonectionRequestSchema
);

module.exports = ConnectionRequestModel;