import Chat from '../model/Chat.js';
import ChatMessage from '../model/ChatMessage.js';
import { getAIReply } from '../services/chat/ChatService.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/AppError.js';
import { systemPrompt } from '../config/chatai.js';

export const createChat = catchAsync(async (req, res) => {
    const { title } = req.body;
    const chat = await Chat.create({ 
        userId: req.user._id, 
        title: req.body.title,
        systemPrompt
    });
    res.status(201).json(chat);
});

export const sendMessage = catchAsync(async (req, res) => {
    const { content } = req.body;
    const chatId = req.params.chatId;

    // Validate chat exists and belongs to user
    const chat = await Chat.findOne({ _id: chatId, userId: req.user._id });
    if (!chat) {
        throw new AppError('Chat not found or unauthorized', 404);
    }

    const userMsg = await ChatMessage.create({
        chatId,
        sender: "user",
        content
    });

    // Generate assistant reply
    const assistantReply = await getAIReply(content);

    const assistantMsg = await ChatMessage.create({
        chatId,
        sender: 'assistant',
        content: assistantReply
    });

    res.status(201).json([userMsg, assistantMsg]);
});

export const getMessages = catchAsync(async (req, res) => {
    const chatId = req.params.chatId;
    
    // Validate chat exists and belongs to user
    const chat = await Chat.findOne({ _id: chatId, userId: req.user._id });
    if (!chat) {
        throw new AppError('Chat not found or unauthorized', 404);
    }

    const messages = await ChatMessage.find({ chatId })
        .sort({ timestamp: 1 });
    res.status(200).json(messages);
});

export const getChats = catchAsync(async (req, res) => {
    const chats = await Chat.find({ userId: req.user._id })
        .sort({ createdAt: -1 });
    res.status(200).json(chats);
});
