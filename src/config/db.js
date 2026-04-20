import mongoose from 'mongoose';
import env from './env.js';
import logger from '../utils/logger.js';

const wait = (delayMs) => new Promise((resolve) => {
  setTimeout(resolve, delayMs);
});

const registerConnectionEvents = () => {
  mongoose.connection.on('disconnected', () => {
    logger.warn('MongoDB disconnected');
  });

  mongoose.connection.on('reconnected', () => {
    logger.info('MongoDB reconnected');
  });

  mongoose.connection.on('error', (error) => {
    logger.error('MongoDB connection error', { error: error.message });
  });
};

const connectDB = async () => {
  registerConnectionEvents();

  for (let attempt = 1; attempt <= env.dbConnectRetries; attempt += 1) {
    try {
      await mongoose.connect(env.mongoUri, {
        autoIndex: env.nodeEnv !== 'production',
        serverSelectionTimeoutMS: 10000,
      });

      logger.info('MongoDB connected successfully', { attempt });
      return;
    } catch (error) {
      logger.error('MongoDB connection attempt failed', {
        attempt,
        error: error.message,
      });

      if (attempt === env.dbConnectRetries) {
        logger.error('MongoDB connection failed after max retries');
        return false;
      }

      await wait(env.dbRetryDelayMs);
    }
  }

  return false;
};

export default connectDB;
