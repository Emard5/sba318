import express from "express";
import comments from "../data/comments.js";

const router = express.Router();

// Get comments for a post
router.get("/:postId", (req, res) => {
  const postId = parseInt(req.params.postId);
  const postComments = comments.filter((c) => c.postId === postId);
  res.json(postComments);
});

// Create comment
router.post("/", (req, res) => {
  const { postId, content } = req.body;
  if (!postId || !content)
    return res.status(400).json({ error: "postId and content are required" });

  const newComment = {
    id: comments.length + 1,
    postId: parseInt(postId),
    content,
  };
  comments.push(newComment);
  res.status(201).json(newComment);
});

export default router;
