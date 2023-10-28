const mongoose = require("mongoose");
const { validatePost, BlogPost } = require("../models/blogPost");
const { User } = require("../models/users");
const {
  createBlogPost,
  getBlogPosts,
  getMyBlogPost,
  getSinglePost,
} = require("../service/post");

const createPost = async (req, res) => {
  const body = req.body;
  const { _id: author } = req.user;

  const result = await createBlogPost(body, author);
  res.status(201).send(result);
};

const getPosts = async (req, res) => {
  const posts = await getBlogPosts();
  res.send(posts);
};

const getMyPost = async (req, res) => {
  const authorId = req.user._id;
  const posts = await getMyBlogPost(authorId);
  res.status(201).send(posts);
};

const getPost = async (req, res) => {
  const { id: postId } = req.params;
  const post = await getSinglePost(postId);
  res.send(post);
};

const deletePost = async (req, res) => {
  const post = await BlogPost.findByIdAndRemove(req.params.id);
  if (!post) return res.status(404).send("There is no post with the given ID");
  res.send(post);
};

const updatePost = async (req, res) => {
  const { error } = validatePost(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  const { title, description, post } = req.body;

  const updatedPost = await BlogPost.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        title,
        description,
        post,
      },
    }
  );
  res.send(updatedPost);
};

const likePost = async (req, res) => {
  const user = await User.findOne({ _id: req.user._id });
  if (!user) return res.status(400).send("Invalid user details");
  const postToCheck = new mongoose.Types.ObjectId(req.params.id);
  const checkPost = user.likes.includes(postToCheck);

  checkPost ? user.likes.pull(postToCheck) : user.likes.push(postToCheck);

  const post = await BlogPost.findOne({ _id: req.params.id });
  checkPost ? post.likeCount-- : post.likeCount++;

  await post.save();
  await user.save();
  res.send(post);
};

const getMyLikes = async (req, res) => {
  const user = await User.findById(req.params.id)
    .populate("likes")
    .select("likes -_id");
  res.send(user.likes);
};

module.exports = {
  getMyLikes,
  createPost,
  getPost,
  getPosts,
  updatePost,
  deletePost,
  likePost,
  getMyPost,
};
