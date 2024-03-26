const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const dotenv = require("dotenv");


const app = express();
dotenv.config();
const port = process.env.PORT || 3000 ;
const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;
mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.bdroxk7.mongodb.net/registrationFormDB`,
{useNewUrlParser : true,
useUnifiedTopology : true});

const registrationSchema = new mongoose.Schema({
    name : String,
    email : String,
    password : String
});

const registration = mongoose.model("registration",registrationSchema );
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());


app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/Pages/index.html");
})

app.post("/register",async(req,res)=>{
    try{
        const {name,email,password} = req.body;
        const registrationData = new registration({
            name,
            email,
            password
        });
        await registrationData.save();
        res.redirect("/success");
    }
    catch(error){
        console.log(error);
        res.redirect("error");
    }
})

app.get("/success",(req,res)=>{
    res.sendFile(__dirname + "/Pages/success.html");
})

app.get("/error", (req,res)=>{
    res.sendFile(__dirname + "/Pages/error.html");
})



app.listen(port,()=>{
    console.log("App is listening at port", port);
})