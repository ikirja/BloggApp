//***************************************************************************
// BloggApp, all rights reserved, 2018-2020. Developed by Kirill Makeev.
//***************************************************************************
// Component: Routes
// Type: Backend
//***************************************************************************

const express = require('express');
const router = express.Router();
const sanitizeHtml = require('sanitize-html');
const Post = require('../../models/post');
const Comment = require('../../models/comment')
const { permissionsMiddleware } = require('../../functions');

//************
// API Comment
//************

// Create Comment
router.post('/comment', permissionsMiddleware.isLoggedIn, async (req, res) => {
  let comment = {
    author: {
      id: req.user._id,
      name: req.user.name
    },
    description: sanitizeHtml(req.body.description)
  };

  try {
    let post = await Post.findById(req.body.post);
    let newComment = await Comment.create(comment);
    post.comments.push(newComment);
    post.save();
    res.send(newComment);
  } catch(err) {
    res.status(400).send('Error occured while creating comment');
  }
});

// Get Comment
router.get('/comment/:id', permissionsMiddleware.checkUserComment, async (req, res) => {
  try {
    let comment = await Comment.findById(req.params.id);
    res.send(comment);
  } catch(err) {
    res.status(400).send('Error occured while getting comment');
  }
})

// Update Comment
router.put('/comment/:id', permissionsMiddleware.checkUserComment, async (req, res) => {
  let comment = {
    description: sanitizeHtml(req.body.description)
  };

  try {
    let updatedComment = await Comment.findByIdAndUpdate(req.params.id, comment);
    res.send(updatedComment);
  } catch(err) {
    res.status(400).send('Error occured while updating comment');
  }
})

// Delete Comment
router.delete('/comment/:id', permissionsMiddleware.checkUserComment, async (req, res) => {
  try {
    await Comment.findByIdAndRemove(req.params.id);
    res.send('Comment has been deleted')
  } catch(err) {
    res.status(400).send('Error occured while deleting comment');
  }
})

module.exports = router;