//jshint esversion:6

const express= require("express");
const bodyParser = require("body-parser");
const ejs= require("ejs");
const _ = require("lodash");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Travel-JournalDB',{useNewUrlParser: true});

const app=express(); //creates app using ejs
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const homeStartingContent="I'm a Web Developer.I ❤️ painting and travelling";

const aboutContent="I'm from Bangladesh and completed gradutation from Computer Science & Engineering of The University of Rajshahi.Over the time,I have gained a growing of experience designing and developing web applications."

const contactContent="Get In Touch.If you love reading as much I do.If you love reading as much I do? Let's talk about coding & some books!.My Email: rimtycse@email.com"


const postSchema= mongoose.Schema({
    title: String,
    content: String
 }); 
 //schema model
 const Post =mongoose.model("Post",postSchema);
 let posts=[];

app.get("/",function(req,res){
  res.render("home",{ 
    startingHome: homeStartingContent,
    posts : posts 
  });
  
});

app.get("/about",function(req,res){
res.render("about",{  startingAbout : aboutContent });

});

app.get("/contact",function(req,res){
    res.render("contact",{ startingContact: contactContent });
  });

  

  app.get("/compose",function(req,res){

    Post.find({},function(err,foundPost){
      res.render("home",{ 
        startingHome: homeStartingContent,
        posts : foundPost
      });
    });
    
  }); 

app.post("/compose", function(req,res){

  const post = new Post({
    title   : req.body.postTitle,//const used for not changing it
    content : req.body.postBody
  });


//posts.push(post);
post.save();
res.redirect("/");
});

app.get("/posts/:postName" , function(req,res){
   const requestedTitle = _.lowerCase(req.params.postName);

   posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);
     
    if( storedTitle === requestedTitle){
       res.render("post" ,
       { 
        title : post.title,
        content:post.content 
      });
    }
   });
 });



app.listen(8000,function(){
    console.log("Server is running on port 8000");
});