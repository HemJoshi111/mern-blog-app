import express from 'express';
const router = express.Router();
import {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  getMyPosts,
} from '../controllers/postController.js';
import { protect } from '../middleware/authMiddleware.js';

// Public routes
router.get('/', getPosts);
router.get('/:id', getPostById);

// Private (protected) routes
router.post('/', protect, createPost);
router.put('/:id', protect, updatePost);
router.delete('/:id', protect, deletePost);
router.get('/my/posts', protect, getMyPosts); // Route for user's posts

export default router;