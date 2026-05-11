const express = require("express");

const app = express();

//This will only handle GET call to /user
app.get("/user",(req,res) => {
    res.send({firstname : "abhay" ,lastname :"sodha"});
});

//This will only handle GET call to /user
app.post("/user",(req,res) =>{

    //Here we wil writeing logic to store data in db

    res.send("Data successfully saved on database");
})

app.delete(("/user"),(req,res) =>{
    res.send("Deleted user successfully!");
});

app.listen(9999, () =>{
    console.log("server is listing aava dyo on navdi");
});