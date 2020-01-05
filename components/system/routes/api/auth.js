//***************************************************************************
// BloggApp, all rights reserved, 2018-2020. Developed by Kirill Makeev.
//***************************************************************************
// Component: Routes
// Type: Backend
//***************************************************************************

const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../../models/user');

//****
// API
//****

// Login
router.post('/login', passport.authenticate('local'), function(req, res){
  res.send('Logged in');
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  res.send('Logged out');
});

// Register
router.post('/register', (req, res) => {
  let newUser = new User({
    username: req.body.username,
    name: req.body.name,
    isAdmin: false
  });
  User.register(newUser, req.body.password, function(err, user){
    if(err){
      res.status(400).send('User has not been registered');
    } else {
      passport.authenticate('local')(req, res, function(){
        res.send('User has been registered and logged in');
      });
    }
  });
});

module.exports = router;
