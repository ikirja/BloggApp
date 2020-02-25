//***************************************************************************
// BloggApp, all rights reserved, 2018-2020. Developed by Kirill Makeev.
//***************************************************************************
// Component: Routes
// Type: Backend
//***************************************************************************

const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../../models/user');
const PasswordToken = require('../../models/password-token');

// Config
const system = require('../../../../config');

// Transporter for Nodemailer
const transporter = nodemailer.createTransport(system.nodemailer.options);

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
    email: req.body.email,
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

// Forgot Password
router.post('/forgot', async (req, res) => {
  try {
    let user = await User.findOne({ username: req.body.username });
    let token = await PasswordToken.create({ user: user._id, token: crypto.randomBytes(2).toString('hex') });

    let mail = {
      from: system.nodemailer.options.auth.user,
      to: user.email,
      subject: 'Сброс пароля',
      text: `${system.nodemailer.messages.forgotPassword} ${token.token}`
    };

    transporter.sendMail(mail, (err) => {
      if(err){
        res.status(400).send('Error occured while sending Email');
      } else {
        res.send('Email has been sent');
      }
    });

  } catch(err) {
    res.status(400).send('Error has occured');
  }
});

router.post('/forgot/reset', async (req, res) => {
  if(req.body.password === req.body.confirm){
    try {
      let token = await PasswordToken.findOne({ token: req.body.token });
      let user = await User.findOne({ _id: token.user });
      user.setPassword(req.body.password, (err) => {
        if(err) {
          res.status(400).send('Error occured while setting user password');
        } else {
          user.save();
          res.send('Password has been set');
        }
      });
    } catch(err) {
      res.status(400).send('Error has occured while reseting password');
    }
  } else {
    res.status(400).send('Passwords do not match');
  }
});

module.exports = router;
