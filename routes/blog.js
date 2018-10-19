var app = require("express");
var router = app.Router();
var Post = require("../models/post");
var permissions = require("../public/js/permissions");

// Blog Routes
// Blog Index route
router.get("/", function(req, res){
    Post.find({}, function(err, allPosts){
        if(err){
            console.log(err);
        } else {
            var site = {
                title: "Блог",
                description: "Блог о мыслях, разработках, интересах. Присоединяйтесь!"
            }
            res.render("blog/index", { posts: allPosts , site: site });
        }
    });
});

// Blog Create route
router.post("/", permissions.isAdmin, function(req, res){
    var header = req.body.header;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        name: req.user.name
    };
    var post = { header: header, description: description, author: author };
    Post.create(post, function(err, newPost){
        if(err){
            console.log(err);
            res.redirect("/blog");
        } else {
            res.redirect("/blog/" + newPost._id);
        }
    });
});

// Blog Show route
router.get("/:id", function(req, res){
    Post.findById(req.params.id).populate("comments").exec(function(err, post){
        if(err){
            console.log(err);
        } else {
            var site = {
                title: post.header,
                description: post.description.substring(0, 500)
            };
            res.render("blog/show", { post: post, site: site });
        }
    });
});

// Blog Edit route
router.get("/:id/edit", permissions.checkUserBlogPost, function(req, res){
    Post.findById(req.params.id, function(err, post){
        if(err){
            console.log(err);
        } else {
            var site = {
                title: post.header + ", отредактируйте пост в Блоге",
                description: post.description.substring(0, 500)
            };
            res.render("blog/edit", { post: post, site: site });
        }
    });
});

// Blog Update route
router.put("/:id", function(req, res){
    Post.findByIdAndUpdate(req.params.id, { $set: req.body.post }, function(err, post){
        if(err){
            console.log(err);
        } else {
            res.redirect("/blog/" + post._id);
        }
    });
});

// Blog Destroy route
router.delete("/:id", permissions.checkUserBlogPost, function(req, res){
    Post.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
        } else {
            res.redirect("/blog");
        }
    });
});

module.exports = router;