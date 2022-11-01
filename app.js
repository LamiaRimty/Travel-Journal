//jshint esversion:6

const express= require("express");
const bodyParser = require("body-parser");
const ejs= require("ejs");



const app=express(); //creates app using ejs
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/",function(req,res){
    res.send("server is up & running");
});

app.listen(3000,function(){
    console.log("Server is running on port 3000");
});