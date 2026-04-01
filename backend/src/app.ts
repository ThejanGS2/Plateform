import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import foodRoutes from './routes/foodRoutes';
import orderRoutes from './routes/orderRoutes';

dotenv.config({ override: true });

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Request Debug Logger
app.use((req, res, next) => {
  console.log(`\n[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  if (req.body && Object.keys(req.body).length > 0) {
    const debugBody = { ...req.body };
    if (debugBody.password) debugBody.password = '********';
    console.log('📦 Body:', debugBody);
  }
  next();
});

app.use('/api/auth', authRoutes);
app.use('/api', foodRoutes);
app.use('/api', orderRoutes);

import mongoose from 'mongoose';

app.get('/api/health', async (req: Request, res: Response) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected';
  res.json({ 
    status: 'OK', 
    message: 'Backend is running', 
    mongodb: dbStatus 
  });
});

app.listen(Number(PORT), '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
