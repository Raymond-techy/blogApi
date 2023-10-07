const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const author = require("../middleware/author");

const {
  getPost,
  getPosts,
  getMyLikes,
  getMyPost,
  createPost,
  deletePost,
  updatePost,
  likePost,
} = require("../controllers/blogpost");

router.get("/", getPosts);
router.get("/:id", getPost);
router.put("/:id", [auth, author], updatePost);
router.post("/", auth, createPost);
router.delete("/:id", [auth, author], deletePost);

router.get("/mypost/:id", auth, getMyPost);

router.put("/like/:id", auth, likePost);

router.get("/mylikes/:id", auth, getMyLikes);

module.exports = router;
