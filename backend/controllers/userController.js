import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utilities/generateToken.js';
import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import dotenv from 'dotenv';

dotenv.config();
const envFile =
  process.env.NODE_ENV === 'production'
    ? '.env.production'
    : '.env.development';
dotenv.config({ path: envFile });

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/users/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      const email = profile.emails[0].value;
      let user = await User.findOne({ email });

      if (user) {
        if (!user.googleId) {
          user.googleId = profile.id;
          user.isOAuthUser = true;
          await user.save();
        }
        return done(null, user);
      } else {
        user = await User.create({
          username: profile.displayName,
          email,
          googleId: profile.id,
          isOAuthUser: true,
        });
        return done(null, user);
      }
    }
  )
);

const googleLogin = passport.authenticate('google', {
  scope: ['profile', 'email'],
});

const googleCallback = asyncHandler(
  (req, res, next) => {
    passport.authenticate('google', (err, user) => {
      if (err || !user) {
        return res.status(401).json({ message: 'Authentication failed' });
      }

      req.user = user;
      next();
    })(req, res, next);
  },
  async (req, res) => {
    generateToken(res, req.user._id);
    res.json({
      _id: req.user._id,
      username: req.user.username,
      email: req.user.email,
      isAdmin: req.user.isAdmin,
    });
  }
);

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
    res.status(401);
    throw new Error('Invalid credentials');
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
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
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
    res.status(400);
    throw new Error('Invalid user data');
  }
});

/**
 * @route   GET /api/users
 * @desc    Retrieve all users
 * @access  Public
 */
const getUsers = asyncHandler(async (req, res) => {
  //FIXME:Should be changed in the future to be viewable only by administrators
  const users = await User.find({}).select('-password');
  res.json(users);
});

/**
 * @route   GET /api/users/:id
 * @desc    Retrieve a single user by ID
 * @access  Private
 */
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
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
    res.status(404);
    throw new Error('User not found');
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
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export {
  loginUser,
  getUsers,
  registerUser,
  getUserById,
  updateUser,
  deleteUser,
  googleLogin,
  googleCallback,
};
