import express from "express"
import {createList, deleteList, updateList} from "../controllers/listController.js"
import { getTasksFromList } from "../controllers/taskController.js"
import { authMiddleware } from "../middleware/authMiddleware.js"
const router = express.Router()

router.get('/:id/tasks', authMiddleware, getTasksFromList);
router.patch('/:id', authMiddleware, updateList);
router.delete('/:id', authMiddleware, deleteList);


export default router;