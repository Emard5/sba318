import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import userRoutes from "./routes/userRoutes.mjs";
import postRoutes from "./routes/postRoutes.mjs";
import commentRoutes from "./routes/commentRoutes.mjs";

import users from "./data/users.js";
import posts from "./data/posts.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

// Pages
app.get("/", (req, res) => {
  res.render("index", { users, posts });
});
app.get("/createUser", (req, res) => res.render("createUser"));
app.get("/createPost", (req, res) => res.render("createPost"));
app.get("/createComment", (req, res) => res.render("createComment"));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke! Please try again later.");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
