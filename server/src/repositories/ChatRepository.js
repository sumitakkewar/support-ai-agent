import BaseRepository from './BaseRepository.js';
import Chat from '../model/Chat.js';

class ChatRepository extends BaseRepository {
    constructor() {
        super(Chat);
    }

    async findByUserId(userId, options = {}) {
        return await this.find({ userId }, options);
    }

    async findOneByUserIdAndId(userId, chatId) {
        return await this.findOne({ _id: chatId, userId });
    }

    async countByUserId(userId) {
        return await this.countDocuments({ userId });
    }
}

export default new ChatRepository(); 