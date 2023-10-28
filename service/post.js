const { BlogPost, validatePost } = require("../models/blogPost");

async function createBlogPost(body, author) {
  const { error } = validatePost(body);
  if (error) return { error: error.details[0].message };

  const { title, description, post } = body;

  const newPost = new BlogPost({
    title,
    description,
    post,
    author,
  });

  return await newPost.save();
}

async function getBlogPosts() {
  return (await BlogPost.find().populate("author", "name email -_id")) || [];
}

async function getSinglePost(postId) {
  const post = await BlogPost.findById(postId);
  if (!post) throw new Error("Post with the given Id was not found");
  return post;
}

async function getMyBlogPost(authorId) {
  const posts = await BlogPost.find({
    author: authorId,
  });
  return posts || [];
}

async function deletOnePOst(postId) {
  const post = await BlogPost.findByIdAndRemove(postId);
  if (!post) throw new Error("Could not find post with the given ID");
  return { message: "successfully deleted" };
}

module.exports = {
  createBlogPost,
  getBlogPosts,
  getMyBlogPost,
  getSinglePost,
  deletOnePOst,
};
