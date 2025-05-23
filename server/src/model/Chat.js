import mongoose from 'mongoose';

const ChatSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: String,
    systemPrompt: {
        type: mongoose.Schema.Types.String,
        length: 2000
    },
}, { timestamps: true });


export default mongoose.model('Chat', ChatSchema);