import dotenv from 'dotenv';

dotenv.config();

const mongoUri = process.env.DB_URI || process.env.MONGO_URI;

const requiredEnvVars = ['PORT', 'JWT_SECRET', 'JWT_EXPIRES_IN'];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

if (!mongoUri) {
  throw new Error('Missing required environment variable: DB_URI or MONGO_URI');
}

const corsOrigins = (process.env.CORS_ORIGINS || 'http://localhost:3000,http://localhost:3001')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 5000,
  mongoUri,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
  corsOrigins,
  rateLimitWindowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  rateLimitMaxRequests: Number(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  dbConnectRetries: Number(process.env.DB_CONNECT_RETRIES) || 5,
  dbRetryDelayMs: Number(process.env.DB_RETRY_DELAY_MS) || 2000,
  leadDuplicateStrategy: process.env.LEAD_DUPLICATE_STRATEGY || 'reject',
  leadDuplicateWindowMinutes: Number(process.env.LEAD_DUPLICATE_WINDOW_MINUTES) || 60,
};

export default env;
