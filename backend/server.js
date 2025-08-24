import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './src/config/db.js';
import authRoutes from './src/routes/authRoutes.js';
import agentRoutes from './src/routes/agentRoutes.js';
import uploadRoutes from './src/routes/uploadRoutes.js';
import { errorHandler } from './src/middleware/errorHandler.js';
import ensureAdmin from './src/config/ensureAdmin.js';

dotenv.config();
const app = express();

app.use(cors({ origin: process.env.CLIENT_ORIGIN || '*', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

await connectDB();
await ensureAdmin();

app.get('/', (req, res) => res.json({ status: 'OK', service: 'MERN Machine Test API' }));
app.use('/api/auth', authRoutes);
app.use('/api/agents', agentRoutes);
app.use('/api/upload', uploadRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
