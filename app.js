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


app.get("/",function(req,res){
  Post.find({},function(err,posts){
    res.render("home",{ 
      startingHome: homeStartingContent,
      posts : posts 
    });
  });
});

app.get("/compose",function(req,res){
  res.render("compose");
}); 

app.post("/compose", function(req,res){

const post = new Post({
  title   : req.body.postTitle,//const used for not changing it
  content : req.body.postBody
});

post.save(function(err){
  if(!err){
    console.log("Blog posted successfully!");
    res.redirect("/");
  }
});

});

app.get("/posts/:postId" , function(req,res){

  const requestedPostId= req.params.postId;

  Post.findOne({_id: requestedPostId},function(err,post){
    res.render("post",{
      title  :   post.title,
      content:   post.content
    });
  });
});

Post.deleteOne({_id:"6398530f6d0973f4f8718a37" } ,function(err){
  if(err){
    console.log(err);
  }

  else{
    console.log("Succesfully deleted document");
  }
});





app.get("/about",function(req,res){
res.render("about",{  startingAbout : aboutContent });

});

app.get("/contact",function(req,res){
    res.render("contact",{ startingContact: contactContent });
  });
  
app.listen(8000,function(){
    console.log("Server is running on port 8000");
});

