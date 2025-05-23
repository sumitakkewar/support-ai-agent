import express from 'express';
import authMiddleware from '../middleware/auth.js';
import { validateChatInput, validateMessageInput } from '../middleware/chatValidation.js';
import { createChat, getChats, getMessages, sendMessage } from '../controller/ChatController.js';

class ChatRouter {
  constructor() {
    this.router = express.Router();
    this.setupRoutes();
  }

  setupRoutes() {
    this.router.post('/', authMiddleware, validateChatInput, createChat);
    this.router.get('/', authMiddleware, getChats);

    this.router.post('/:chatId/message', authMiddleware, validateMessageInput, sendMessage);
    this.router.get('/:chatId/message', authMiddleware, getMessages);
  }

  getRouter() {
    return this.router;
  }
}

const chatRouter = new ChatRouter();
export default chatRouter
