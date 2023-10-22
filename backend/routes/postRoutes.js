import express from 'express';
const router = express.Router();
import {
  getPosts,
  getPostById,
  deletePost,
  createPost,
  updatePost,
} from '../controllers/postController.js';

router.route('/').get(getPosts).post(createPost);
router.route('/:id').get(getPostById).delete(deletePost).put(updatePost);

export default router;
