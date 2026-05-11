const express = require("express");

const app = express();

app.use("/dashboard",(req,res) =>{
    res.send("banavo dashboard abhay bhai");
});

app.use((req,res) => {
    res.send("hello from the server to abhay sodha");
});

app.listen(9999, () =>{
    console.log("server is listing aava dyo on navdi");
});