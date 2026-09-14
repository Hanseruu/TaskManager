import express from 'express'
import {deleteTask, moveTask} from '../controllers/taskController.js'


const router = express.Router();

router.delete('/:id', deleteTask)
router.patch('/:id/move',  moveTask);

export default router