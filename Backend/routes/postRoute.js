const express = require("express");
const router = express.Router();
const { createPost, deletePost, likePost, addComment,getPosts,getUserPosts } = require("../controllers/PostController");
const { checkUser } = require("../middlewares/authMiddleware");


router.post("/", checkUser, createPost);
router.get("/", checkUser, getPosts);
router.get("/post", checkUser, getUserPosts);
router.delete("/:postId", checkUser, deletePost);
router.put("/:postId/like", checkUser, likePost);
router.post("/:postId/comments", checkUser, addComment);

module.exports = router;
