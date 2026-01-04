import express from 'express';
import Task from '../models/Task.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Get all tasks for the logged-in user
// @route   GET /api/tasks
router.get('/', protect, async (req, res) => {
    const tasks = await Task.find({ user: req.user._id });
    res.json(tasks);
});

// @desc    Create a new task
// @route   POST /api/tasks
router.post('/', protect, async (req, res) => {
    const { title, description } = req.body;

    if (!title) {
        return res.status(400).json({ message: 'Please add a title' });
    }

    const task = await Task.create({
        user: req.user._id,
        title,
        description,
    });

    res.status(201).json(task);
});

// @desc    Update a task
// @route   PUT /api/tasks/:id
router.put('/:id', protect, async (req, res) => {
    const task = await Task.findById(req.params.id);

    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }

    // Ensure the logged-in user owns this task
    if (task.user.toString() !== req.user.id) {
        return res.status(401).json({ message: 'User not authorized' });
    }

    const updatedTask = await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true } // Return the updated document
    );

    res.json(updatedTask);
});

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
router.delete('/:id', protect, async (req, res) => {
    const task = await Task.findById(req.params.id);

    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }

    // Ensure user owns the task
    if (task.user.toString() !== req.user.id) {
        return res.status(401).json({ message: 'User not authorized' });
    }

    await task.deleteOne();

    res.json({ id: req.params.id, message: 'Task removed' });
});

export default router;