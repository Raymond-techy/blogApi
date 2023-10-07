const { BlogPost } = require("../models/blogPost");

async function author(req, res, next) {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post)
      return res.status(404).send("There is no post with the given ID");
    if (post.author.toString() !== req.user._id)
      return res.status(401).send("Access denied invalid author");
    next();
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
}

module.exports = author;
