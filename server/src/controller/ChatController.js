import { getAIReply } from '../services/chat/ChatService.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/AppError.js';
import { systemPrompt } from '../config/chatai.js';
import chatRepository from '../repositories/ChatRepository.js';
import chatMessageRepository from '../repositories/ChatMessageRepository.js';

export const createChat = catchAsync(async (req, res) => {
    const { title } = req.body;
    const chat = await chatRepository.create({
        userId: req.user.userId,
        title,
        systemPrompt
    });

    const messages = [
        { role: 'system', content: chat.systemPrompt },
    ];

    const assistantReply = await getAIReply(req.user.userId, messages);

    await chatMessageRepository.createMessage(chat._id, 'assistant', assistantReply);

    res.status(201).json(chat);
});

export const sendMessage = catchAsync(async (req, res) => {
    const { content } = req.body;
    const chatId = req.params.chatId;

    const chat = await chatRepository.findOneByUserIdAndId(req.user.userId, chatId);
    if (!chat) {
        throw new AppError('Chat not found or unauthorized', 404);
    }

    const previousMessages = await chatMessageRepository.findByChatId(chatId, { sort: { createdAt: 1 } });

    const messages = [
        { role: 'system', content: chat.systemPrompt },
        ...previousMessages.map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'assistant',
            content: msg.content,
        })),
        { role: 'user', content }
    ];

    await chatMessageRepository.createMessage(chatId, 'user', content);

    const assistantReply = await getAIReply(req.user.userId, messages);

    const assistantMsg = await chatMessageRepository.createMessage(chatId, 'assistant', assistantReply);

    res.status(201).json(assistantMsg);
});

export const getMessages = catchAsync(async (req, res) => {
    const chatId = req.params.chatId;
    const page = parseInt(req.query.page || '1', 10);
    const limit = parseInt(req.query.limit || '20', 10);

    const chat = await chatRepository.findOneByUserIdAndId(req.user.userId, chatId);
    if (!chat) {
        throw new AppError('Chat not found or unauthorized', 404);
    }

    const totalCount = await chatMessageRepository.countByChatId(chatId);

    const messages = await chatMessageRepository.findByChatId(chatId, {
        sort: { createdAt: -1 },
        skip: (page - 1) * limit,
        limit
    });

    const hasMore = (page * limit) < totalCount;

    res.status(200).json({
        messages,
        hasMore,
    });
});

export const getChats = catchAsync(async (req, res) => {
    const page = parseInt(req.query.page || '1', 10);
    const limit = parseInt(req.query.limit || '20', 10);

    const totalCount = await chatRepository.countByUserId(req.user.userId);

    const chats = await chatRepository.findByUserId(req.user.userId, {
        sort: { createdAt: -1 },
        skip: (page - 1) * limit,
        limit
    });

    const hasMore = (page * limit) < totalCount;

    res.status(200).json({
        chats,
        hasMore,
    });
});
