var app = require("express");
var router = app.Router();
var Photo = require("../models/photo");
var permissions = require("../public/js/permissions");

// Photo Blog Routes
// Photo Blog Index route
router.get("/", function(req, res){
    Photo.find({}, function(err, allPhotos){
        if(err){
            console.log(err);
        } else {
            var site = {
                title: "Фото Блог",
                description: "Блог фотографий, самых разных, отовсюду!"
            };
            res.render("photoblog/index", { photos: allPhotos, site: site });
        }
    });
});

// Photo Blog Create route
router.post("/", permissions.isAdmin, function(req, res){
    var name = req.body.name;
    var url = req.body.url;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        name: req.user.name
    };
    var photo = { name: name, url: url, description: description, author: author };
    Photo.create(photo, function(err, newPhoto){
        if(err){
            console.log(err);
        } else {
            res.redirect("/photoblog/" + newPhoto._id);
        }
    });
});

// Photo Blog Show route
router.get("/:id", function(req, res){
    Photo.findById(req.params.id).populate("comments").exec(function(err, photo){
        if(err){
            console.log(err);
        } else {
            var site = {
                title: photo.name,
                description: photo.description.substring(0, 500)
            };
            res.render("photoblog/show", { photo: photo, site: site });
        }
    });
});

// Photo Blog Edit route
router.get("/:id/edit", permissions.checkUserPhotoBlogPost, function(req, res){
    Photo.findById(req.params.id, function(err, photo){
        if(err){
            console.log(err);
        } else {
            var site = {
                title: photo.name + ", отредактируйте пост в Фото Блоге",
                description: photo.description.substring(0, 500)
            };
            res.render("photoblog/edit", { photo: photo, site: site });
        }
    });
});

// Photo Blog Update route
router.put("/:id", function(req, res){
    Photo.findByIdAndUpdate(req.params.id, { $set: req.body.photo }, function(err, photo){
        if(err){
            console.log(err);
        } else {
            res.redirect("/photoblog/" + photo._id);
        }
    });
});

// Photo Blog Destroy route
router.delete("/:id", permissions.checkUserPhotoBlogPost, function(req, res){
    Photo.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
        } else {
            res.redirect("/photoblog/");
        }
    });
});

module.exports = router;