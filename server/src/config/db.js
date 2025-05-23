import mongoose from 'mongoose';

class Database {
  constructor() {
    this.connection = null;
    this.setupEventListeners();
  }

  setupEventListeners() {
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
      process.exit(1);
    });

    mongoose.connection.on('disconnected', () => {
      console.error('MongoDB disconnected');
      process.exit(1);
    });

    process.on('SIGINT', async () => {
      try {
        await this.disconnect();
        console.log('MongoDB connection closed through app termination');
        process.exit(0);
      } catch (err) {
        console.error('Error during MongoDB disconnection:', err);
        process.exit(1);
      }
    });
  }

  async connect() {
    try {
      this.connection = await mongoose.connect(process.env.MONGO_URI);
      console.log('MongoDB connected successfully');
      return this.connection;
    } catch (error) {
      console.error('MongoDB connection error:', error);
      process.exit(1);
    }
  }

  async disconnect() {
    if (this.connection) {
      await mongoose.connection.close();
    }
  }
}

const db = new Database();
export default db.connect.bind(db);