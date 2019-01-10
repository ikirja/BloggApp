// BloggApp by Kirill Makeev, (c) 2018
//=====
// Init
//=====
var express = require("express");
var app = express();

// Additional modules init
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var session = require("express-session");
var cookieParser = require("cookie-parser");

// Models Init
var User = require("./models/user");

// Routes Init
var indexRoutes = require("./routes/index");
var blogRoutes = require("./routes/blog");
var commentBlogRoutes = require("./routes/commentBlog");
var photoBlogRoutes = require("./routes/photoblog");
var commentPhotoBlogRoutes = require("./routes/commentPhotoBlog");

// Connect to DB with mongoose
mongoose.connect("mongodb://localhost:27017/BloggApp", { useNewUrlParser: true });

// Setting view engine
app.set("view engine", "ejs");

// Additional settings
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(cookieParser("secret"));

//=======================
// PASSPORT CONFIGURATION
//=======================
app.use(session({
    secret: "BloggApp is the best app ever!",
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Additional functions and Globals
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.moment = require("moment");
    res.locals.bloggApp = require("./public/js/functions");
    next();
});

global.site = {
    title: "BloggApp",
    description: "BloggApp, web приложение для Блога и Фото Блога, разработано: Кирилл Макеев."
};

//=======
// ROUTES
//=======
app.use("/", indexRoutes);
app.use("/blog", blogRoutes);
app.use("/blog/:id/comments", commentBlogRoutes);
app.use("/photoblog", photoBlogRoutes);
app.use("/photoblog/:id/comments", commentPhotoBlogRoutes);

//=======
// SERVER
//=======

// Express Staging Server
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("BloggApp server has started.");
});

// Express Production Server with SSL
// var fs = require('fs');
// var https = require('https');
// var keySsl = fs.readFileSync('./privkey.pem');
// var certSsl = fs.readFileSync('./fullchain.pem');
// var ssl = {
//     key: keySsl,
//     cert: certSsl
// };

// var httpsServer = https.createServer(ssl, app);
// httpsServer.listen(443, function(){
//     console.log("BloggApp server with SSL has started.");
// });