import mongoose from 'mongoose';

const taskSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // Links task to a specific user
    },
    title: { type: String, required: true },
    description: { type: String },
    isCompleted: { type: Boolean, default: false }
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);
export default Task;