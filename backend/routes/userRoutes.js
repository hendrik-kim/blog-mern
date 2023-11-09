import express from 'express';
const router = express.Router();
import { loginUser, registerUser } from '../controllers/userController.js';

// Route for user login
router.post('/login', loginUser).post('/register', registerUser);

export default router;
