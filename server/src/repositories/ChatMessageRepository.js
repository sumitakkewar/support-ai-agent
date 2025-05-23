import BaseRepository from './BaseRepository.js';
import ChatMessage from '../model/ChatMessage.js';

class ChatMessageRepository extends BaseRepository {
    constructor() {
        super(ChatMessage);
    }

    async findByChatId(chatId, options = {}) {
        return await this.find({ chatId }, options);
    }

    async countByChatId(chatId) {
        return await this.countDocuments({ chatId });
    }

    async createMessage(chatId, sender, content) {
        return await this.create({
            chatId,
            sender,
            content
        });
    }
}

export default new ChatMessageRepository(); 