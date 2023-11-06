import express from 'express';
const router = express.Router();
import { loginUser } from '../controllers/userController.js';

// Route for user login
router.post('/login', loginUser);

export default router;
