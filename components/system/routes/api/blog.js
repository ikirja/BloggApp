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
const { permissionsMiddleware } = require('../../functions');

//****
// API
//****

// Get Blog Posts
router.get('/posts', async (req, res) => {
  try {
    let posts = await Post.find();
    res.json(posts);
  } catch(err) {
    res.status(400).send('Error occured while finding Posts');
  }
});

// Get Blog Post
router.get('/post/:id', async (req, res) => {
  try {
    let post = await Post.findById(req.params.id).populate('comments');
    res.json(post);
  } catch(err){
    res.status(400).send('Error occured while finding Post');
  }
})

// Create Blog Post
router.post('/post', permissionsMiddleware.isAdmin, async (req, res) => {
  let post = {
    author: {
      id: req.user._id,
      name: req.user.name
    },
    header: req.body.header,
    description: sanitizeHtml(req.body.description)
  };

  try {
    let newPost = await Post.create(post);
    res.send(newPost);
  } catch(err) {
    res.status(400).send('Error occured while creating Post');
  }
});

// Update Blog Post
router.put('/post/:id', permissionsMiddleware.isAdmin, async (req, res) => {
  let post = {
    header: req.body.header,
    description: sanitizeHtml(req.body.description)
  };

  try {
    let updatedPost = await Post.findByIdAndUpdate(req.params.id, post);
    res.send(updatedPost);
  } catch(err) {
    res.status(400).send('Error occured while updating Post');
  }
});

// Delete Blog Post
router.delete('/post/:id', permissionsMiddleware.isAdmin, async (req, res) => {
  try {
    await Post.findByIdAndRemove(req.params.id);
    res.send('Post has been deleted');
  } catch(err) {
    res.status(400).send('Error occured while deleting Post');
  }
});

module.exports = router;
