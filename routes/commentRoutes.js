// routes/commentRoutes.js

const express = require('express');
const router = express.Router();
const comments = require('../data/comments');

// GET all comments for a specific post
// Route: GET /api/comments/:postId
router.get('/:postId', (req, res) => {
  const postId = parseInt(req.params.postId);
  const postComments = comments.filter(comment => comment.postId === postId);
  res.json(postComments);
});

// POST a new comment
// Route: POST /api/comments
router.post('/', (req, res) => {
  const { postId, content } = req.body;

  if (!postId || !content) {
    return res.status(400).json({ error: 'postId and content are required' });
  }

  const newComment = {
    id: comments.length + 1,
    postId: parseInt(postId),
    content
  };

  comments.push(newComment);
  res.status(201).json(newComment);
});

module.exports = router;
