// authController.js
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import dotenv from 'dotenv';
import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import User from '../models/userModel.js';
import generateToken from '../utilities/generateToken.js';

dotenv.config();
const envFile =
  process.env.NODE_ENV === 'production'
    ? '.env.production'
    : '.env.development';
dotenv.config({ path: envFile });

const validateToken = asyncHandler(async (req, res) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ isAuthenticated: false });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ isAuthenticated: false });
    }

    const user = await User.findOne(
      { _id: decoded.userId },
      { _id: 1, username: 1, email:1, isAdmin: 1, isOAuthUser:1 } //return all necessary fields.  
      );

    return res.json({ isAuthenticated: true, user: user });
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/google/callback',
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

const googleCallback = asyncHandler(async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Authentication failed' });
  }
  generateToken(res, req.user._id);
  res.redirect(`${process.env.APP_CLIENT_URL}`);
});

export { validateToken, googleLogin, googleCallback };
