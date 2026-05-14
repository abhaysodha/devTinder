const jwt = require("jsonwebtoken");
const user = require("../models/user");


const userAuth = async (req,res,next) => {
    const {token} = req.cookies;
    if(!token){
        throw new Error ("Token is not valid");
    }
    try{
        const decodedObj = await jwt.verify(token,"DEV@Tinder$999");

        const {_id} = decodedObj ;

        const user = await User.findById(_id);
        
        if(!user){
            throw new Error("User is not found"); 
        }
        req.user = user;
        next();
    }
    catch(err){
        res.status(400).send("ERROR : " + err.message);
    }
}

module.exports ={
    userAuth,
};