export class AIChatStrategy {
    async getReply(userId, previousMessages) {
        throw new Error('getReply() must be implemented');
    }
}
