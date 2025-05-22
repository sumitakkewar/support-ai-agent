import express from 'express';
import auth from '../middleware/auth.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/AppError.js';

const router = express.Router();

router.post('/', auth, catchAsync(async (req, res) => {
  if (!req.user?.userId) {
    throw new AppError('User not authenticated', 401);
  }

  // TODO: Implement actual AI chat logic here
  res.json({ reply: 'AI reply placeholder' });
}));

export default router;
