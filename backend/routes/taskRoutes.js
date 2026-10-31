import express from 'express'
import { createTask, deleteTask, moveTask } from "../controllers/taskController.js";
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();


router.post("/", authMiddleware, createTask);
router.delete('/:id', authMiddleware, deleteTask);
router.patch('/:id/move', authMiddleware, moveTask);

export default router;