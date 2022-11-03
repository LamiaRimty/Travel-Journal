//jshint esversion:6

const express= require("express");
const bodyParser = require("body-parser");
const ejs= require("ejs");



const app=express(); //creates app using ejs
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const homeStartingContent="I'm a Web Developer.I ❤️ painting and travelling";

const aboutContent="I'm from Bangladesh and completed gradutation from Computer Science & Engineering of The University of Rajshahi.Over the time,I have gained a growing of experience designing and developing web applications."

const contactContent="Get In Touch.If you love reading as much I do.If you love reading as much I do? Let's talk about coding & some books!.My Email: rimtycse@email.com"
const composeContent="";

app.get("/",function(req,res){
  res.render("home",{ startingHome: homeStartingContent });
});

app.get("/about",function(req,res){
    res.render("about",{  startingAbout : aboutContent });

});

app.get("/contact",function(req,res){
    res.render("contact",{ startingContact: contactContent });
  });

  app.get("/compose",function(req,res){
    res.render("compose",{ composePublish : composeContent });
  });


app.listen(3000,function(){
    console.log("Server is running on port 3000");
});