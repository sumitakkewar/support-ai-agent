import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/AppError.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userRepository from '../repositories/UserRepository.js';
import { jwtSecret } from '../config/app.js';

export const signup = catchAsync(async (req, res) => {
    const { name, email, password } = req.body;

    const exists = await userRepository.findByEmail(email);
    if (exists) {
        throw new AppError('User already exists', 400);
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await userRepository.createUser({ name, email, password: hashed });

    const token = jwt.sign({ userId: user._id }, jwtSecret);
    res.status(201).json({ token, name: user.name });
});

export const login = catchAsync(async (req, res) => {
    const { email, password } = req.body;

    const user = await userRepository.findByEmail(email);
    if (!user) {
        throw new AppError('Invalid credentials', 400);
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw new AppError('Invalid credentials', 400);
    }

    const token = jwt.sign({ userId: user._id }, jwtSecret);
    res.status(200).json({
        token,
        name: user.name
    });
}); 