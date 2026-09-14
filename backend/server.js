import express from "express";
import config from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import boardRoutes from './routes/boardRoutes.js';

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000


app.use('/api/auth', authRoutes);
app.use('/api/boards', boardRoutes);
app.use('/api/tasks', taskRoutes);


app.listen(PORT, () => {
    console.log(`Server is listening on: http://localhost:${PORT}`);
});


