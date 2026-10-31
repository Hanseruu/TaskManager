import express from "express";
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import boardRoutes from './routes/boardRoutes.js';
import listRoutes from './routes/listRoutes.js'
import { initDB } from "./config/initDB.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/boards', boardRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/lists', listRoutes);


initDB().then(() => {
    app.listen(PORT, () => {
    console.log(`Server is listening on: http://localhost:${PORT}`);
});
})


