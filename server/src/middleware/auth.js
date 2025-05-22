import jwt from 'jsonwebtoken';
import AppError from '../utils/AppError.js';
import catchAsync from '../utils/catchAsync.js';

const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = catchAsync(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new AppError('No token provided', 401);
  }

  const token = authHeader.split(' ')[1];
  const decoded = jwt.verify(token, JWT_SECRET);
  req.user = decoded;
  next();
});

export default authMiddleware;
