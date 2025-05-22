import ChatMessage from '../model/ChatMessage.js';
import Chat from '../models/Chat.js';

export async function buildMessages(chatId, newMessage) {
    const chat = await Chat.findById(chatId);
    const messages = await ChatMessage.find({ chatId }).sort({ createdAt: 1 });

    const formattedMessages = messages.map((msg) => ({
        role: msg.sender,
        content: msg.text,
    }));

    // 👇 Only prepend system message on the first user message
    if (formattedMessages.length === 0) {
        formattedMessages.unshift({
            role: 'system',
            content: chat.systemPrompt || 'You are a helpful assistant.',
        });
    }

    // Add the new message
    formattedMessages.push({
        role: 'user',
        content: newMessage,
    });

    return formattedMessages;
}
