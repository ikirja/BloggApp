// BloggApp by Kirill Makeev, (c) 2018

// Init
var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

// Connect to DB
mongoose.connect("mongodb://localhost:27017/BloggApp", { useNewUrlParser: true });

// Setting view engine
app.set("view engine", "ejs");

// Additional settings
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

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
    description: String,
    date: {
        type: Date,
        default: Date.now
    }
});

var Photo = mongoose.model("Photo", photoSchema);

// ======
// ROUTES
// ======

// Landing Page Route
app.get("/", function(req, res){
    res.render("index");
});

// Blog Routes
// Blog index route
app.get("/blog", function(req, res){
    Post.find({}, function(err, allPosts){
        if(err){
            console.log(err);
        } else {
            res.render("blog/index", { posts: allPosts });
        }
    });
});

// Blog create route
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

// Blog show route
app.get("/blog/:id", function(req, res){
    Post.findById(req.params.id, function(err, post){
        if(err){
            console.log(err);
        } else {
            res.render("blog/show", { post: post });
        }
    });
});

// Blog edit route
app.get("/blog/:id/edit", function(req, res){
    Post.findById(req.params.id, function(err, post){
        if(err){
            console.log(err);
        } else {
            res.render("blog/edit", { post: post });
        }
    });
});

// Blog update route
app.put("/blog/:id", function(req, res){
    Post.findByIdAndUpdate(req.params.id, { $set: req.body.post }, function(err, post){
        if(err){
            console.log(err);
        } else {
            res.redirect("/blog/" + post._id);
        }
    });
});

// Blog destroy route
app.delete("/blog/:id", function(req, res){
    Post.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
        } else {
            res.redirect("/blog");
        }
    });
});

// Photo Blog Routes
// Photo blog index route
app.get("/photoblog", function(req, res){
    Photo.find({}, function(err, allPhotos){
        if(err){
            console.log(err);
        } else {
            res.render("photoblog/index", { photos: allPhotos });
        }
    });
});

// Photo Blog create route
app.post("/photoblog", function(req, res){
    Photo.create(req.body.photo, function(err, newPhoto){
        if(err){
            console.log(err);
        } else {
            res.redirect("/photoblog");
        }
    });
});

// Photo Blog show route
app.get("/photoblog/:id", function(req, res){
    Photo.findById(req.params.id, function(err, photo){
        if(err){
            console.log(err);
        } else {
            res.render("photoblog/show", { photo: photo });
        }
    });
});

// Photo Blog edit route

// Photo Blog update route

// Photo Blog destroy route

// Server
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("BloggApp server has started.");
});