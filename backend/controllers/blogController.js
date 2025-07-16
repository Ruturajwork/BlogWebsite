import asyncHandler from "express-async-handler";
import BlogPost from "../models/blogModel.js";

// @desc    Create a new blog post
// @route   POST /api/blog/posts
// @access  Public (can be restricted based on your application's needs)
const createBlogPost = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  const autharID = req.user._id;
  if (!autharID) {
    throw new Error("User not found");
  }
  console.log(autharID);
  const newBlogPost = new BlogPost({
    author: autharID,
    title,
    content,
  });

  const createdPost = await newBlogPost.save();
  res.status(201).json(createdPost);
});

// @desc    Get all blog posts
// @route   GET /api/blog/posts
// @access  Public (can be restricted based on your application's needs)
const getBlogPosts = asyncHandler(async (req, res) => {
  const blogPosts = await BlogPost.find().populate("author", "name"); // Populate author field with user's name from User model

  res.json(blogPosts);
});

// @desc    Get single blog post by ID
// @route   GET /api/blog/posts/:id
// @access  Public (can be restricted based on your application's needs)
const getBlogPostById = asyncHandler(async (req, res) => {
  const blogPost = await BlogPost.findById(req.params.id).populate(
    "author",
    "name"
  ); // Populate author field with user's name from User model

  if (!blogPost) {
    res.status(404);
    throw new Error("Blog post not found");
  }

  res.json(blogPost);
});

// @desc    Update a blog post by ID
// @route   PUT /api/blog/posts/:id
// @access  Public (can be restricted based on your application's needs)
const updateBlogPost = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  const blogPost = await BlogPost.findById(req.params.id);

  if (!blogPost) {
    res.status(404);
    throw new Error("Blog post not found");
  }

  blogPost.title = title;
  blogPost.content = content;

  const updatedPost = await blogPost.save();
  res.json(updatedPost);
});

// @desc    Delete a blog post by ID
// @route   DELETE /api/blog/posts/:id
// @access  Public (can be restricted based on your application's needs)
const deleteBlogPost = asyncHandler(async (req, res) => {
  const blogPost = await BlogPost.findById(req.params.id);

  if (!blogPost) {
    res.status(404);
    throw new Error("Blog post not found");
  }

  await blogPost.deleteOne(); // Ensure the blogPost object has a .remove() method or equivalent
  res.json({ message: "Blog post deleted successfully" });
});

export {
  createBlogPost,
  getBlogPosts,
  getBlogPostById,
  updateBlogPost,
  deleteBlogPost,
};
