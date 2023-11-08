import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import postRoutes from './routes/postRoutes.js';
import userRoutes from './routes/userRoutes.js';
import connectDB from './config/database.js';

dotenv.config();
const envFile =
  process.env.NODE_ENV === 'production'
    ? '.env.production'
    : '.env.development';
dotenv.config({ path: envFile });

connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.json());

app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/public/')));

  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
} else {
  app.get('/', (req, res) => {
    res.send('API Server is running...');
  });
}

app.listen(
  process.env.PORT || 5000,
  console.log(`API Server running in ${process.env.NODE_ENV} mode`.green.bold)
);
