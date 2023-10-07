const mongoose = require("mongoose");
const Joi = require("joi");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  description: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  post: {
    type: String,
    required: true,
    minlength: 5,
  },
  likeCount: {
    type: Number,
    default: 0,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const BlogPost = new mongoose.model("Post", postSchema);

const validatePost = (post) => {
  const schema = Joi.object({
    title: Joi.string().min(5).max(50).required(),
    description: Joi.string().min(5).max(50).required(),
    post: Joi.string().min(5).required(),
  });
  return schema.validate(post);
};

module.exports = { validatePost, BlogPost };
