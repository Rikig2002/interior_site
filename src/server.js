import app from './app.js';
import env from './config/env.js';
import connectDB from './config/db.js';
import logger from './utils/logger.js';
import mongoose from 'mongoose';

/*
Deployment quick guide:
Option 1 - Render:
1) Push this repository to GitHub.
2) Create a new Web Service in Render and connect the repo.
3) Set build command: npm install
4) Set start command: npm start
5) Add env vars: NODE_ENV, PORT, DB_URI (or MONGO_URI), JWT_SECRET, JWT_EXPIRES_IN, CORS_ORIGINS.

Option 2 - Railway:
1) Push to GitHub and connect project in Railway.
2) Configure service start command: npm start.
3) Set required environment variables in Railway dashboard.

Option 3 - AWS (EC2/Elastic Beanstalk/ECS):
1) Push code to repository and deploy application container or Node runtime.
2) Set production environment variables securely.
3) Point reverse proxy/load balancer to PORT from environment.
*/

let server;

const startServer = async () => {
  server = app.listen(env.port, () => {
    logger.info(`Server running on port ${env.port}`, {
      nodeEnv: env.nodeEnv,
    });
  });

  await connectDB();
};

const shutdown = async (signal) => {
  logger.warn(`Received ${signal}. Starting graceful shutdown.`);

  if (server) {
    server.close(async () => {
      await mongoose.connection.close();
      logger.info('HTTP server and database connection closed gracefully');
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
};

process.on('SIGINT', () => {
  shutdown('SIGINT');
});

process.on('SIGTERM', () => {
  shutdown('SIGTERM');
});

startServer();
