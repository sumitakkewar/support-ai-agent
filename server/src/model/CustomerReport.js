import mongoose from 'mongoose';

const CustomerReportSchema = new mongoose.Schema({
    description: { type: String, required: true },
    sentiment: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['pending', 'reviewed', 'rejected'], default: 'pending' },
}, { timestamps: true });

export default mongoose.model('CustomerReport', CustomerReportSchema);