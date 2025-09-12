import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

import userRoutes from "./routes/userRoutes.mjs";
import postRoutes from "./routes/postRoutes.mjs";
import commentRoutes from "./routes/commentRoutes.mjs";

import users from "./data/users.js";
import posts from "./data/posts.mjs";

const fileName = fileURLToPath(import.meta.url);
const dirName = path.dirname(fileName);

const app = express();
const PORT = process.env.PORT || 3000;

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(dirName, "public")));

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(dirName, "views"));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

app.get("/", (req, res) => {
  res.render("index", { users, posts });
});

app.get("/create-user", (req, res) => {
  res.render("create-users");
});

app.get("/create-post", (req, res) => {
  res.render("create-post");
});

app.get("/create-comment", (req, res) => {
  res.render("create-comments");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).send("Something broke! Please try again later.");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
