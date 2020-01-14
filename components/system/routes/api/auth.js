//***************************************************************************
// BloggApp, all rights reserved, 2018-2020. Developed by Kirill Makeev.
//***************************************************************************
// Component: Routes
// Type: Backend
//***************************************************************************

const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const { middleware } = require('../../functions');
const system = require('../../../../config');

//****
// API
//****

// Login
router.post('/login', passport.authenticate('local', { session: false }), function(req, res){
  const token = jwt.sign(req.user.toObject(), system.jwtSecret, { expiresIn: 604800 });
  res.json(token);
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
      passport.authenticate('local', { session: false })(req, res, function(){
        const token = jwt.sign(req.user.toObject(), system.jwtSecret, { expiresIn: 604800 });
        res.json(token);
      });
    }
  });
});

// User Info
router.get('/user', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    let user = await User.findById(req.user._id);
    let allowedInfo = {
      id: user._id,
      name: user.name,
      isAdmin: user.isAdmin
    }
    res.json(allowedInfo);
  } catch(err) {
    res.send('User has not been found');
  }
})

module.exports = router;
