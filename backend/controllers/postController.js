import asyncHandler from "express-async-handler";
import Post from "../models/postModel.js";
import User from "../models/userModel.js";

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
    res.json({ message: "Post removed" });
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
  const { title, content, postVisibility, timestamp } = req.body;

  if (!content || content.trim() === "") {
    res.status(400).json({ message: "Content cannot be empty" });
    return;
  }

  const user1 = await User.findOne({ email: "test@test.com" });

  const post = new Post({
    user: user1,
    title: title,
    category: "test",
    content: content,
    postVisibility: postVisibility,
    timestamp: timestamp,
  });

  const createdPost = await post.save();
  //res.status(201).json(createdPost);
  res.status(201).json({ message: "Post created successfully" });
});

/**
 * @route   PUT /api/posts/:id
 * @desc    Update a post by ID
 * @access  Private
 */
const updatePost = asyncHandler(async (req, res) => {
  const { title, imageUrl, category, content, postVisibility } = req.body;
  const post = await Post.findById(req.params.id);

  if (post) {
    post.title = title || post.title;
    post.imageUrl = imageUrl || post.imageUrl;
    post.category = category || post.category;
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
