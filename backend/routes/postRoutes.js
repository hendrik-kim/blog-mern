import express from 'express';
const router = express.Router();
import {
  getPosts,
  getPostById,
  deletePost,
  createPost,
  updatePost,
  addCommentToPost,
} from '../controllers/postController.js';

router.route('/').get(getPosts).post(createPost);
router
  .route('/:id')
  .get(getPostById)
  .delete(deletePost)
  .put(updatePost)
  .post(addCommentToPost);

export default router;
