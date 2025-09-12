// routes/postRoutes.js

const express = require('express');
const router = express.Router();
const posts = require('../data/posts');

// GET all posts (with optional userId filtering)
router.get('/', (req, res) => {
  const { userId } = req.query;
  let filteredPosts = posts;

  if (userId) {
    filteredPosts = posts.filter(post => post.userId === parseInt(userId));
  }

  res.json(filteredPosts);
});

// POST create a new post
router.post('/', (req, res) => {
  const { userId, title, content } = req.body;

  if (!userId || !title || !content) {
    return res.status(400).json({ error: 'userId, title and content are required' });
  }

  const newPost = {
    id: posts.length + 1,
    userId: parseInt(userId),
    title,
    content
  };

  posts.push(newPost);
  res.status(201).json(newPost);
});

// PATCH update a post by id
router.patch('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find(p => p.id === id);

  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }

  const { title, content } = req.body;

  if (title) post.title = title;
  if (content) post.content = content;

  res.json(post);
});

// DELETE a post by id
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const postIndex = posts.findIndex(p => p.id === id);

  if (postIndex === -1) {
    return res.status(404).json({ error: 'Post not found' });
  }

  posts.splice(postIndex, 1);
  res.status(204).send(); // no content
});

module.exports = router;
