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

// Additional JS files and globals
global.myFunctions = require("./public/js/functions");

// Models
// User
var userSchema = new mongoose.Schema({
    username: String,
    password: String
});

var User = mongoose.model("User", userSchema);

// Post
var postSchema = new mongoose.Schema({
    header: String,
    author: String,
    description: String,
    date: {
        type: Date,
        default: Date.now
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

var Post = mongoose.model("Post", postSchema);

// Photo
var photoSchema = new mongoose.Schema({
    name: String,
    author: String,
    url: String,
    description: String,
    date: {
        type: Date,
        default: Date.now
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

var Photo = mongoose.model("Photo", photoSchema);

// Comment
var commentSchema = new mongoose.Schema({
    description: String,
    author: String,
    date: {
        type: Date,
        default: Date.now
    }
});

var Comment = mongoose.model("Comment", commentSchema);

// ======
// ROUTES
// ======

// Landing Page Route
app.get("/", function(req, res){
    res.render("index");
});

// Blog Routes
// Blog Index route
app.get("/blog", function(req, res){
    Post.find({}, function(err, allPosts){
        if(err){
            console.log(err);
        } else {
            res.render("blog/index", { posts: allPosts });
        }
    });
});

// Blog Create route
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

// Blog Show route
app.get("/blog/:id", function(req, res){
    Post.findById(req.params.id).populate("comments").exec(function(err, post){
        if(err){
            console.log(err);
        } else {
            res.render("blog/show", { post: post });
        }
    });
});

// Blog Edit route
app.get("/blog/:id/edit", function(req, res){
    Post.findById(req.params.id, function(err, post){
        if(err){
            console.log(err);
        } else {
            res.render("blog/edit", { post: post });
        }
    });
});

// Blog Update route
app.put("/blog/:id", function(req, res){
    Post.findByIdAndUpdate(req.params.id, { $set: req.body.post }, function(err, post){
        if(err){
            console.log(err);
        } else {
            res.redirect("/blog/" + post._id);
        }
    });
});

// Blog Destroy route
app.delete("/blog/:id", function(req, res){
    Post.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
        } else {
            res.redirect("/blog");
        }
    });
});

// Blog Comment New route
app.get("/blog/:id/comments/new", function(req, res){
    Post.findById(req.params.id, function(err, post){
        if(err){
            console.log(err);
        } else {
            var category = "blog";
            res.render("comments/new", { post: post, category: category });
        }
    });
});

// Blog Comment Create route
app.post("/blog/:id/comments", function(req, res){
    Post.findById(req.params.id, function(err, post){
        if(err){
            console.log(err);
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    post.comments.push(comment);
                    post.save();
                    res.redirect("/blog/" + post._id);
                }
            });
        }
    });
});

// Blog Comment Edit route
app.get("/blog/:id/comments/:commentId/edit", function(req, res){
    Comment.findById(req.params.commentId, function(err, comment){
        if(err){
            console.log(err);
        } else {
            var category = "blog";
            res.render("comments/edit", { post_id: req.params.id, comment: comment, category: category });
        }
    });
});

// Blog Comment Update route
app.put("/blog/:id/comments/:commentId", function(req, res){
    Comment.findByIdAndUpdate(req.params.commentId, { $set: req.body.comment }, function(err, comment){
        if(err){
            console.log(err);
        } else {
            res.redirect("/blog/" + req.params.id);
        }
    });
});

// Blog Comment Destroy route
app.delete("/blog/:id/comments/:commentId", function(req, res){
    Comment.findByIdAndRemove(req.params.commentId, function(err){
        if(err){
            console.log(err);
        } else {
            res.redirect("/blog/" + req.params.id);
        }
    });
});

// Photo Blog Routes
// Photo Blog Index route
app.get("/photoblog", function(req, res){
    Photo.find({}, function(err, allPhotos){
        if(err){
            console.log(err);
        } else {
            res.render("photoblog/index", { photos: allPhotos });
        }
    });
});

// Photo Blog Create route
app.post("/photoblog", function(req, res){
    Photo.create(req.body.photo, function(err, newPhoto){
        if(err){
            console.log(err);
        } else {
            res.redirect("/photoblog");
        }
    });
});

// Photo Blog Show route
app.get("/photoblog/:id", function(req, res){
    Photo.findById(req.params.id).populate("comments").exec(function(err, photo){
        if(err){
            console.log(err);
        } else {
            res.render("photoblog/show", { photo: photo });
        }
    });
});

// Photo Blog Edit route
app.get("/photoblog/:id/edit", function(req, res){
    Photo.findById(req.params.id, function(err, photo){
        if(err){
            console.log(err);
        } else {
            res.render("photoblog/edit", { photo: photo });
        }
    });
});

// Photo Blog Update route
app.put("/photoblog/:id", function(req, res){
    Photo.findByIdAndUpdate(req.params.id, { $set: req.body.photo }, function(err, photo){
        if(err){
            console.log(err);
        } else {
            res.redirect("/photoblog/" + photo._id);
        }
    });
});

// Photo Blog Destroy route
app.delete("/photoblog/:id", function(req, res){
    Photo.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
        } else {
            res.redirect("/photoblog/");
        }
    });
});

// Photo Blog Comment New route
app.get("/photoblog/:id/comments/new", function(req, res){
    Photo.findById(req.params.id, function(err, post){
        if(err){
            console.log(err);
        } else {
            var category = "photoblog";
            res.render("comments/new", { post: post, category: category });
        }
    });
});

// Photo Blog Comment Create route
app.post("/photoblog/:id/comments", function(req, res){
    Photo.findById(req.params.id, function(err, post){
        if(err){
            console.log(err);
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    post.comments.push(comment);
                    post.save();
                    res.redirect("/photoblog/" + post._id);
                }
            });
        }
    });
});

// Photo Blog Comment Edit route
app.get("/photoblog/:id/comments/:commentId/edit", function(req, res){
    Comment.findById(req.params.commentId, function(err, comment){
        if(err){
            console.log(err);
        } else {
            var category = "photoblog";
            res.render("comments/edit", { post_id: req.params.id, comment: comment, category: category });
        }
    });
});

// Photo Blog Comment Update route
app.put("/photoblog/:id/comments/:commentId", function(req, res){
    Comment.findByIdAndUpdate(req.params.commentId, { $set: req.body.comment }, function(err, comment){
        if(err){
            console.log(err);
        } else {
            res.redirect("/photoblog/" + req.params.id);
        }
    });
});

// Photo Blog Comment Destroy route
app.delete("/photoblog/:id/comments/:commentId", function(req, res){
    Comment.findByIdAndRemove(req.params.commentId, function(err){
        if(err){
            console.log(err);
        } else {
            res.redirect("/photoblog/" + req.params.id);
        }
    });
});

//=======
// SERVER
//=======
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("BloggApp server has started.");
});