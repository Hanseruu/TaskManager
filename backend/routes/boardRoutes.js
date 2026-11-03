import express from 'express'
import { getBoards, getBoardId, createBoard, deleteBoard, updateBoard } from '../controllers/boardController.js'
import { getListsFromBoard } from '../controllers/listController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', authMiddleware, getBoards);
router.get('/:id/lists', authMiddleware, getListsFromBoard);
router.get('/:id', authMiddleware, getBoardId);
router.post('/', authMiddleware, createBoard);
router.delete('/:id', authMiddleware, deleteBoard);
router.put('/:id', authMiddleware, updateBoard);

export default router;