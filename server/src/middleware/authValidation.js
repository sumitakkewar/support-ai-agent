import AppError from '../utils/AppError.js';

export const validateSignupInput = (req, res, next) => {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
        return next(new AppError('Name, email and password are required', 400));
    }
    
    if (typeof name !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
        return next(new AppError('All fields must be strings', 400));
    }
    
    if (name.length < 2 || name.length > 50) {
        return next(new AppError('Name must be between 2 and 50 characters', 400));
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return next(new AppError('Invalid email format', 400));
    }
    
    if (password.length < 6) {
        return next(new AppError('Password must be at least 6 characters long', 400));
    }
    
    next();
};

export const validateLoginInput = (req, res, next) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return next(new AppError('Email and password are required', 400));
    }
    
    if (typeof email !== 'string' || typeof password !== 'string') {
        return next(new AppError('Email and password must be strings', 400));
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return next(new AppError('Invalid email format', 400));
    }
    
    next();
}; 