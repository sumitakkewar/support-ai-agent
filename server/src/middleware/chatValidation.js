import AppError from '../utils/AppError.js';

export const validateChatInput = (req, res, next) => {
    const { title } = req.body;
    
    if (!title) {
        return next(new AppError('Title is required', 400));
    }
    
    if (typeof title !== 'string') {
        return next(new AppError('Title must be a string', 400));
    }
    
    if (title.length < 1 || title.length > 100) {
        return next(new AppError('Title must be between 1 and 100 characters', 400));
    }
    
    next();
};

export const validateMessageInput = (req, res, next) => {
    const { content } = req.body;
    
    if (!content) {
        return next(new AppError('content is required', 400));
    }
    
    if (content.length < 1 || content.length > 5000) {
        return next(new AppError('Message content must be between 1 and 5000 characters', 400));
    }
    
    next();
}; 