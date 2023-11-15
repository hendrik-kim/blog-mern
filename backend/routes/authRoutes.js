import express from 'express';
import passport from 'passport';
import {
  googleLogin,
  googleCallback,
  validateToken,
} from '../controllers/authController.js';

const router = express.Router();

router.get('/google', googleLogin);

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/sign-in' }),
  googleCallback
);

router.get('/validate', validateToken);

export default router;
