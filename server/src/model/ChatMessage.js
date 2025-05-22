import mongoose from 'mongoose';

const ChatMessageSchema = new mongoose.Schema({
    chatId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Chat' },
    sender: { type: String, enum: ['user', 'assistant'], required: true },
    content: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('ChatMessage', ChatMessageSchema);
