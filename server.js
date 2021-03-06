//********************************************************************************
// BloggApp, all rights reserved, 2018-2020. Developed by Kirill Makeev.
//********************************************************************************

//*****
// INIT
//*****
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const passportJWT = require('passport-jwt');
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const cors = require('cors');


// CONFIGURATION INIT
const system = require('./config');

// User Model
const User = require(`${system.components.system}/models/user`);

// DB
mongoose.connect(`mongodb://localhost:27017/${system.db}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

// Settings
app.use(cors());
app.use(express.static(system.publicRoot));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser('sAeDAyvx2cYz5FFV'));
app.use(methodOverride('_method'));
app.use(passport.initialize());
passport.use(new LocalStrategy(User.authenticate()));
passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: system.jwtSecret
}, function(jwtPayload, cb){
  return User.findById(jwtPayload._id)
          .then(user => {
            return cb(null, user);
          })
          .catch(err => {
            return cb(err);
          });
  })
);


//*******
// ROUTES
//*******
// API ROUTE
let auth = require(`${system.components.system}/routes/api/auth`);
let blog = require(`${system.components.system}/routes/api/blog.js`);
let comment = require(`${system.components.system}/routes/api/comment`);
let email = require(`${system.components.system}/routes/api/email`);
app.use('/api', auth);
app.use('/api', blog);
app.use('/api', comment);
app.use('/api', email);

// Serve Frontend Public Directory
app.get('*', (req, res) => {
  res.sendFile('index.html', { root: system.publicRoot });
});

// PORT and IP
var port = '';
var ip = '';

if(system.nodeEnv === 'DEVELOPMENT'){
  port = 3000;
  ip = 'localhost';
} else {
  port = system.port;
  ip = system.ip;
}

//*******
// SERVER
//*******
app.listen(port, ip, function(){
  console.log('Server has started.');
});
