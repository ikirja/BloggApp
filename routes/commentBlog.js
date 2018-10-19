var app = require("express");
var router = app.Router({ mergeParams: true });
var Post = require("../models/post");
var Comment = require("../models/comment");
var permissions = require("../public/js/permissions");

// Blog Comment routes
// Blog Comment New route
router.get("/new", permissions.isLoggedIn, function(req, res){
    Post.findById(req.params.id, function(err, post){
        if(err){
            console.log(err);
        } else {
            var category = "blog";
            var site = {
                title: post.header + ", добавьте комментарий",
                description: post.description.substring(0, 500)
            };
            res.render("comments/new", { post: post, category: category, site: site });
        }
    });
});

// Blog Comment Create route
router.post("/", permissions.isLoggedIn, function(req, res){
    Post.findById(req.params.id, function(err, post){
        if(err){
            console.log(err);
        } else {
            var description = req.body.description;
            var author = {
                id: req.user._id,
                name: req.user.name
            };
            var comment = { description: description, author: author };
            Comment.create(comment, function(err, comment){
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
router.get("/:commentId/edit", permissions.checkUserComment, function(req, res){
    Comment.findById(req.params.commentId, function(err, comment){
        if(err){
            console.log(err);
        } else {
            var category = "blog";
            var site = {
                title: "Отредактируйте комментарий",
                description: comment.description.substring(0, 500)
            };
            res.render("comments/edit", { post_id: req.params.id, comment: comment, category: category, site: site });
        }
    });
});

// Blog Comment Update route
router.put("/:commentId", function(req, res){
    Comment.findByIdAndUpdate(req.params.commentId, { $set: req.body.comment }, function(err, comment){
        if(err){
            console.log(err);
        } else {
            res.redirect("/blog/" + req.params.id);
        }
    });
});

// Blog Comment Destroy route
router.delete("/:commentId", permissions.checkUserComment, function(req, res){
    Comment.findByIdAndRemove(req.params.commentId, function(err){
        if(err){
            console.log(err);
        } else {
            res.redirect("/blog/" + req.params.id);
        }
    });
});

module.exports = router;