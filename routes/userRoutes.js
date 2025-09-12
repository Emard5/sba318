// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const users = require('../data/users');

// GET all users
router.get('/', (req, res) => {
  res.json(users);
});

// POST create a new user
router.post('/', (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  const newUser = {
    id: users.length + 1,
    name,
    email,
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

// PATCH update a user by id
router.patch('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const { name, email } = req.body;

  if (name) user.name = name;
  if (email) user.email = email;

  res.json(user);
});

// DELETE a user by id
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  users.splice(index, 1);
  res.status(204).send(); // No content
});

module.exports = router;
