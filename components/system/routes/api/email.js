//***************************************************************************
// BloggApp, all rights reserved, 2018-2020. Developed by Kirill Makeev.
//***************************************************************************
// Component: Routes
// Type: Backend
//***************************************************************************

const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const sanitizeHtml = require('sanitize-html');
const system = require('../../../../config')

// Transporter for Nodemailer
const transporter = nodemailer.createTransport(system.nodemailer.options);

//*************
// API Sendmail
//*************

// Send Info
router.post('/sendmail', async (req, res) => {
  let mail = {
    from: 'me@kirillmakeev.ru',
    to: 'kirill.makeev@icloud.com',
    subject: 'Сообщение с kirillmakeev.ru',
    text: sanitizeHtml(req.body.text)
  };

  transporter.sendMail(mail, (err) => {
    if(err){
      res.status(400).send('Error while sending email');
    } else {
      res.send('Email has been sent')
    }
  });
});

module.exports = router;