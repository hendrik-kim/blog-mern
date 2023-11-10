import express from 'express';
const router = express.Router();
import {
  loginUser,
  registerUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';

router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/:id', getUserById);
router.get('/', getUsers);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
