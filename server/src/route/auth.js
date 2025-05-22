import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../model/User.js';
import AppError from '../utils/AppError.js';
import catchAsync from '../utils/catchAsync.js';
import { jwtSecret } from '../config/app.js';

const router = express.Router();

// Signup
router.post('/signup', catchAsync(async (req, res) => {
  const { name, email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) {
    throw new AppError('User already exists', 400);
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed });

  const token = jwt.sign({ userId: user._id }, jwtSecret);
  res.json({ token });
}));

// Login
router.post('/login', catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError('Invalid credentials', 400);
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new AppError('Invalid credentials', 400);
  }

  const token = jwt.sign({ userId: user._id }, jwtSecret);
  res.json({ token });
}));

export default router;
