import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './route/auth.js';
import chatRoutes from './route/chat.js';
import connectDB from './config/db.js';
import errorHandler from './middleware/errorHandler.js';
import requestLogger from './middleware/requestLogger.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(requestLogger);

connectDB().then(() => {
  app.use('/api/auth', authRoutes);
  app.use('/api/chat', chatRoutes);

  app.use(errorHandler);

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
