import express from 'express'
import {getBoards, getBoardId, createBoard, deleteBoard} from '../controllers/boardController.js'
const router = express.Router()

router.get('/', getBoards);
router.get('/:id', getBoardId);
router.post('/', createBoard);
router.delete('/:id', deleteBoard);

export default router;