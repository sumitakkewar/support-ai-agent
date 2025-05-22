import mongoose from 'mongoose';

const ChatSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: String,
    systemPrompt: {
        type: String,
        default: 'You are a helpful assistant.',
    },
}, { timestamps: true });


export default mongoose.model('Chat', ChatSchema);