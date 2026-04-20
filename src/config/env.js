import dotenv from 'dotenv';

dotenv.config();

const envProcess = globalThis.process;
const mongoUri = envProcess?.env?.DB_URI || envProcess?.env?.MONGO_URI;

const requiredEnvVars = ['JWT_SECRET', 'JWT_EXPIRES_IN'];

for (const envVar of requiredEnvVars) {
  if (!envProcess?.env?.[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

if (!mongoUri) {
  throw new Error('Missing required environment variable: DB_URI or MONGO_URI');
}

const corsOrigins = (envProcess?.env?.CORS_ORIGINS || 'http://localhost:3000,http://localhost:3001')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const env = {
  nodeEnv: envProcess?.env?.NODE_ENV || 'development',
  port: Number(envProcess?.env?.PORT) || 5000,
  mongoUri,
  jwtSecret: envProcess?.env?.JWT_SECRET,
  jwtExpiresIn: envProcess?.env?.JWT_EXPIRES_IN,
  corsOrigins,
  rateLimitWindowMs: Number(envProcess?.env?.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  rateLimitMaxRequests: Number(envProcess?.env?.RATE_LIMIT_MAX_REQUESTS) || 100,
  dbConnectRetries: Number(envProcess?.env?.DB_CONNECT_RETRIES) || 5,
  dbRetryDelayMs: Number(envProcess?.env?.DB_RETRY_DELAY_MS) || 2000,
  leadDuplicateStrategy: envProcess?.env?.LEAD_DUPLICATE_STRATEGY || 'reject',
  leadDuplicateWindowMinutes: Number(envProcess?.env?.LEAD_DUPLICATE_WINDOW_MINUTES) || 60,
};

export default env;
