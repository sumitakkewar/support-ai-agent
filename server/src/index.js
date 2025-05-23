import express from 'express';
import cors from 'cors';
import authRoutes from './route/auth.js';
import chatRoutes from './route/chat.js';
import connectDB from './config/db.js';
import errorHandler from './middleware/errorHandler.js';
import requestLogger from './middleware/requestLogger.js';
import { port } from './config/app.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use(requestLogger);

connectDB().then(() => {
  app.use('/api/auth', authRoutes.getRouter());
  app.use('/api/chat', chatRoutes.getRouter());
  app.use(errorHandler);
  app.listen(port, () => console.log(`Server running on port ${port}`));
});
