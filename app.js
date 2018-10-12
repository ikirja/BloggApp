// BloggApp by Kirill Makeev, (c) 2018

// Init
var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

// Connect to DB
mongoose.connect("mongodb://localhost:27017/BloggApp", { useNewUrlParser: true });

// Setting view engine
app.set("view engine", "ejs");

// Additional settings
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Moment JS
app.locals.moment = require("moment");

//Additional JS files and globals
global.myFunctions = require("./public/js/functions");

// Models
// Post
var postSchema = new mongoose.Schema({
    header: String,
    author: String,
    description: String,
    date: {
        type: Date,
        default: Date.now
    }
});

var Post = mongoose.model("Post", postSchema);

//Photo
var photoSchema = new mongoose.Schema({
    name: String,
    author: String,
    url: String,
    date: {
        type: Date,
        default: Date.now
    }
});

var Photo = mongoose.model("Photo", photoSchema);

// ===
// ROUTES
// ===

// Landing Page Routes
app.get("/", function(req, res){
    res.render("index");
});

// Blog Routes
app.get("/blog", function(req, res){
    Post.find({}, function(err, allPosts){
        if(err){
            console.log(err);
        } else {
            res.render("blog/index", { posts: allPosts });
        }
    });
});

app.post("/blog", function(req, res){
    Post.create(req.body.post, function(err, newPost){
        if(err){
            console.log(err);
            res.redirect("/blog");
        } else {
            res.redirect("/blog");
        }
    });
});

app.get("/blog/:id", function(req, res){
    Post.findById(req.params.id, function(err, post){
        if(err){
            console.log(err);
        } else {
            res.render("blog/show", { post: post });
        }
    });
});

// Photo Blog Routes
app.get("/photoblog", function(req, res){
    res.render("photoblog/index");
});

// Server
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("BloggApp server has started.");
});