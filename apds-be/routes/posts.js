const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const checkAuth = require('../middleware/check-auth');

//GET all posts
router.get('', (req, res, next) => {
  Post.find().sort({ date: -1 })
    .then(documents => {
      res.status(200).json({
        message: 'Posts fetched successfully',
        posts: documents
      });
    });
});

// Code Attribution
// The IIE. 2021. APDS7311 LAB GUIDE 2023. The Independent Institute of Education: Unpublished.
//CREATE a post
router.post('', checkAuth, (req, res, next) =>
{
    const post = new Post(
    {
        username: req.body.username,
        title: req.body.title,
        content: req.body.content,
        date: req.body.date,
        department: req.body.department
    });
    post.save()
    .then(createdPost =>
    {
        res.status(201).json(
        {
            message: 'Post added successfully',
            postId: createdPost._id
        });
    });
});

//DELETE a post
router.delete('/:id', checkAuth, (req,res,next) =>
{
    Post.deleteOne({ _id: req.params.id })
    .then(result =>
    {
        res.status(200).json({ message: 'Post deleted' });
    });
});

module.exports = router;