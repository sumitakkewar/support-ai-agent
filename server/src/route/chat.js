import express from 'express';
import authMiddleware from '../middleware/auth.js';
import { validateChatInput, validateMessageInput } from '../middleware/chatValidation.js';
import { createChat, getChats, getMessages, sendMessage } from '../controller/ChatController.js';

const router = express.Router();

router.post('/', authMiddleware, validateChatInput, createChat);
router.get('/', authMiddleware, getChats);
router.post('/:chatId/message', authMiddleware, validateMessageInput, sendMessage);
router.get('/:chatId/message', authMiddleware, getMessages);

export default router;
