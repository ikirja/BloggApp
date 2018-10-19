var Post = require("../../models/post");
var Photo = require("../../models/photo");
var Comment = require("../../models/comment");

module.exports = {
    isLoggedIn: function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        res.redirect("/login");
    },
    isNotLoggedIn: function(req, res, next){
        if(!req.isAuthenticated()){
            return next();
        }
        res.redirect("/");
    },
    isAdmin: function(req, res, next){
        if(req.isAuthenticated()){
            if(req.user.isAdmin){
                return next();
            } else {
                res.redirect("/");
            }
        }
        res.redirect("/login");
    },
    checkUserBlogPost: function(req, res, next){
        if(req.isAuthenticated()){
            Post.findById(req.params.id, function(err, post){
                if(err){
                    console.log(err);
                } else if(post.author.id.equals(req.user._id)){
                    next();
                } else {
                    res.redirect("/blog/" + req.params.id);
                }
            });
        } else {
            res.redirect("/login");
        }
    },
    checkUserPhotoBlogPost: function(req, res, next){
        if(req.isAuthenticated()){
            Photo.findById(req.params.id, function(err, photo){
                if(err){
                    console.log(err);
                } else if(photo.author.id.equals(req.user._id)){
                    next();
                } else {
                    res.redirect("/photoblog/" + req.params.id);
                }
            });
        } else {
            res.redirect("/login");
        }
        
    },
    checkUserComment: function(req, res, next){
        if(req.isAuthenticated()){
            Comment.findById(req.params.commentId, function(err, comment){
                if(err){
                    console.log(err);
                } else if(comment.author.id.equals(req.user._id)){
                    next();
                } else {
                    res.redirect("/")
                }
            });
        } else {
            res.redirect("/login");
        }
    }
};