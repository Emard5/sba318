const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');

const users = require('./data/users');
const posts = require('./data/posts');

const app = express();
const PORT = process.env.PORT || 3000;

// === Custom Middleware #1: Logger ===
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();
});

// === Custom Middleware #2: Request Time ===
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Body parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Mount API routes under /api
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

// === Routes that render views ===

// Home page: lists users and posts
app.get('/', (req, res) => {
  res.render('index', { users, posts });
});

// Render create user form
app.get('/create-user', (req, res) => {
  res.render('create-user');
});

// Render create post form
app.get('/create-post', (req, res) => {
  res.render('create-post');
});

// Render create comment form
app.get('/create-comment', (req, res) => {
  res.render('create-comment');
});

// === Error-handling middleware ===
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).send('Something broke! Please try again later.');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
