// routes/postRoutes.mjs

import express from "express";
import posts from "../data/posts.mjs";

const router = express.Router();

router.get("/", (req, res) => {
  const { userId } = req.query;
  let filteredPosts = posts;

  if (userId) {
    filteredPosts = posts.filter((post) => post.userId === parseInt(userId));
  }

  res.json(filteredPosts);
});

router.post("/", (req, res) => {
  const { userId, title, content } = req.body;
  if (!userId || !title || !content) {
    return res.status(400).json({ error: "userId, title and content are required" });
  }

  const newPost = {
    id: posts.length + 1,
    userId: parseInt(userId),
    title,
    content,
  };

  posts.push(newPost);
  res.status(201).json(newPost);
});

router.patch("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((p) => p.id === id);

  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  const { title, content } = req.body;
  if (title) post.title = title;
  if (content) post.content = content;

  res.json(post);
});

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = posts.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Post not found" });
  }

  posts.splice(index, 1);
  res.status(204).send();
});

export default router;
