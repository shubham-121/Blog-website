//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const _=require("lodash")

const homeStartingContent = "Hi there! Welcome to my Blog Website"
const aboutContent = "Hi! My name is Shubham Bhatt"
const contactContent = "Email- shubhambhatt3006@gmail.com "

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


let posts=[]




app.get('/',(req,res)=>{
  res.render("home", {startingContent:homeStartingContent, posts: posts})
  
 // console.log(posts)              //redirecting from the compose page to home page after creating a new post
  

  })

app.get('/about',(req,res)=>{
  res.render("about", {aboutContent:aboutContent})
})

app.get('/contact',(req,res)=>{
  res.render("contact", { contactContent:contactContent})
})

app.get('/compose',(req,res)=>{
  res.render("compose")
})

app.post('/compose',(req,res)=>{
  // var titleData= req.body.getData
  // var postData=req.body.postBody

  const post={                        //creating array to stor both title and composed data
    title: req.body.getData,
    content:  req.body.postBody
  }

  posts.push(post)

  res.redirect('/')          //redirect to homepage
  
  // console.log(postData);
})


/*        creating dynamic url  below*/

  
app.get('/posts/:postName',(req,res)=>{           
 // var requestedTitle= req.params.postName                     //  /posts is the route here and /:postName is the parameter
 var requestedTitle= _.lowerCase(req.params.postName) ;         // lodash function. it Converts string, as space separated words, to lower case.
 


 posts.forEach((post)=>{
 // var storedTitle=post.title;                                    
  var storedTitle=_.lowerCase(post.title);                        //Converts string, as space separated words, to lower case.

  if (storedTitle==requestedTitle)
  // console.log("match found");
  // else
  // console.log("match not found");

  res.render("post", {
    title: post.title,
    content: post.content
  })
 })
})

app.listen(3000, function() {
  console.log("Server started on port 3000");
});


