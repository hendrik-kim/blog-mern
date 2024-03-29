import asyncHandler from "express-async-handler";
import Post from "../models/postModel.js";
import User from "../models/userModel.js";
import Category from "../models/categoryModel.js";

/**
 * @route   GET /api/posts
 * @desc    Retrieve all posts
 * @access  Public
 */
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({});
  res.json(posts);
});

/**
 * @route   GET /api/posts/:id
 * @desc    Retrieve a single post by ID
 * @access  Public
 */
const getPostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ message: "Post not found" });
  }
});

/**
 * @route   DELETE /api/posts/:id
 * @desc    Delete a post by ID
 * @access  Private
 */
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post) {
    await post.deleteOne();
    const postId = post._id;
    res.json(postId);
  } else {
    res.status(404).json({ message: "Post not found" });
  }
});

/**
 * @route   POST /api/posts
 * @desc    Create a new post
 * @access  Private
 */
const createPost = asyncHandler(async (req, res) => {
  const { userId, title, content, category, postVisibility, timestamp } =
    req.body;
  if (!content || content.trim() === "") {
    res.status(400).json({ message: "Content cannot be empty" });
    return;
  }

  const user = await User.findById(userId);
  const categoryID = await Category.findById(category);

  if (!user || !category) {
    res.status(400).json({ message: "User or Category not found" });
    return;
  }

  const post = new Post({
    user: user._id.toString(),
    username: user.username.toString(),
    title: title,
    category: categoryID.name.toString(),
    content: content,
    postVisibility: postVisibility,
    timestamp: timestamp,
  });

  const createdPost = await post.save();
  res.status(201).json(createdPost);
});

/**
 * @route   PUT /api/posts/:id
 * @desc    Update a post by ID
 * @access  Private
 */
const updatePost = asyncHandler(async (req, res) => {
  const { title, imageUrl, category, content, postVisibility } = req.body;
  const post = await Post.findById(req.params.id);
  const categoryID = await Category.findById(category);
  if (post) {
    post.title = title || post.title;
    post.imageUrl = imageUrl || post.imageUrl;
    post.category =
      categoryID.name.toString() || post.categoryID.name.toString();
    post.content = content || post.content;
    post.postVisibility = postVisibility || post.postVisibility;

    const updatedPost = await post.save();
    res.json(updatedPost);
  } else {
    res.status(404).json({ message: "Post not found" });
  }
});

/**
 * @route   Post /api/posts/:id
 * @desc    Add a comment to a post with an ID
 * @access  Public
 */
const addCommentToPost = asyncHandler(async (req, res) => {
  const { postId, userId, content } = req.body;

  const post = await Post.findById(postId);
  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }

  const comment = new Comment({
    postId,
    userId,
    content,
  });

  const savedComment = await comment.save();
  post.comments.push(savedComment._id);
  await post.save();

  res.status(201).json(savedComment);
});

export {
  getPosts,
  getPostById,
  deletePost,
  createPost,
  updatePost,
  addCommentToPost,
};
