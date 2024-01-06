import asyncHandler from "express-async-handler";
import dotenv from "dotenv";

import User from "../models/userModel.js";
import generateToken from "../utilities/generateToken.js";

dotenv.config();
const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";
dotenv.config({ path: envFile });

/**
 * @route   POST /api/users/login
 * @desc    Authenticate user & get token
 * @access  Public
 */
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
    throw new Error("Invalid credentials");
  }
});

/**
 * @route   POST /api/users
 * @desc    Register a new user
 * @access  Public
 */
const registerUser = asyncHandler(async (req, res) => {
  const { email, password, username } = req.body;

  const userExists = await User.findOne({ email });
  const usernameExists = await User.findOne({ username });
  if (userExists) {
    res.status(409).json({ message: "User already exists" });
    throw new Error("User already exists");
  } else if (usernameExists) {
    res.status(409).json({ message: "Username already exists" });
    throw new Error("Username already exists");
  }

  const user = await User.create({
    email,
    password,
    username,
  });

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
    throw new Error("Invalid user data");
  }
});

/**
 * @route   GET /api/users
 * @desc    Retrieve all users
 * @access  Public
 */
const getUsers = asyncHandler(async (req, res) => {
  //FIXME:Should be changed in the future to be viewable only by administrators
  const users = await User.find({}).select("-password");
  res.json(users);
});

/**
 * @route   GET /api/users/:id
 * @desc    Retrieve a single user by ID
 * @access  Private
 */
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
    throw new Error("User not found");
  }
});

/**
 * @route   PUT /api/users/:id
 * @desc    Update user information
 * @access  Private
 */
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404).json({ message: "User not found" });
    throw new Error("User not found");
  }
});

/**
 * @route   DELETE /api/users/:id
 * @desc    Delete a user
 * @access  Private
 */
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.deleteOne();
    res.json({ message: "User removed" });
  } else {
    res.status(404).json({ message: "User not found" });
    throw new Error("User not found");
  }
});

const signOut = (req, res) => {
  res.clearCookie("jwt", {
    httpOnly: true,
  });

  res.json({ message: "Signed out successfully" });
};

export {
  loginUser,
  getUsers,
  registerUser,
  getUserById,
  updateUser,
  deleteUser,
  signOut,
};
