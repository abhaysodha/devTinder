const adminAuth = (req,res,next) => {
    console.log("authenticating admin...");
    const token = "abc";
    const isAdminAuthorized = token ==="abc";
    if(!isAdminAuthorized){
        res.status(401).send("Unauthorized request");
    }
    else{
        next();
    }
};


const userAuth =(req,res,next) => {
    console.log("Authenticating user...");
    const token = "xyz";
    const isUserAuthorized = token === "xyz";
    if(!isUserAuthorized){
        res.status(401).send("Unauthorized request");
    }
    else{
        next();
    }
}

module.exports ={
    adminAuth,
    userAuth,
};