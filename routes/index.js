var app = require("express");
var router = app.Router();
var passport = require("passport");
var User = require("../models/user");
var permissions = require("../public/js/permissions");

// Landing Page routes
// Landing Page Index route
router.get("/", function(req, res){
    res.render("index");
});

// Landing Page Register routes
router.get("/register", permissions.isNotLoggedIn, function(req, res){
    var site = {
        title: "Регистрация",
        description: "Для комментирования в Блоге и Фото Блоге необходимо зарегистрироваться."
    };
    res.render("register", { site: site });
});

router.post("/register", function(req, res){
    var isAdmin = false;
    if(req.body.username === "admin"){
        isAdmin = true;
    };
    var newUser = new User({ username: req.body.username, name: req.body.name, isAdmin: isAdmin });
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
        } else {
            passport.authenticate("local")(req, res, function(){
                res.redirect("/");
            });
        }
    });
});

// Landing Page Login routes
router.get("/login", permissions.isNotLoggedIn, function(req, res){
    var site = {
        title: "Аутентификация",
        description: "Для комментирования в Блоге и Фото Блоге необходимо аутентифицироваться если Вы уже зарегистрировались."
    };
    res.render("login", { site: site });
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
}),
function(req, res){});

// Landing Page Logout route
router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/login");
});

module.exports = router;