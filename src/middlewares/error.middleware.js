import env from '../config/env.js';
import logger from '../utils/logger.js';

const normalizeError = (error) => {
  const normalizedError = {
    statusCode: error.statusCode || 500,
    message: error.message || 'Internal Server Error',
  };

  if (error.name === 'CastError') {
    normalizedError.statusCode = 400;
    normalizedError.message = `Invalid value for field: ${error.path}`;
  }

  if (error.name === 'ValidationError') {
    normalizedError.statusCode = 400;
    normalizedError.message = Object.values(error.errors)
      .map((val) => val.message)
      .join(', ');
  }

  if (error.name === 'MongoServerError' && error.code === 11000) {
    const duplicateField = Object.keys(error.keyValue || {}).join(', ');
    normalizedError.statusCode = 409;
    normalizedError.message = `Duplicate value for: ${duplicateField}`;
  }

  if (error.name === 'JsonWebTokenError') {
    normalizedError.statusCode = 401;
    normalizedError.message = 'Invalid authentication token';
  }

  if (error.name === 'TokenExpiredError') {
    normalizedError.statusCode = 401;
    normalizedError.message = 'Authentication token has expired';
  }

  if (error.isJoi) {
    normalizedError.statusCode = 400;
    normalizedError.message = error.details?.map((detail) => detail.message).join(', ') || 'Validation failed';
  }

  return normalizedError;
};

const errorHandler = (error, req, res, next) => {
  const normalizedError = normalizeError(error);
  const statusCode = normalizedError.statusCode || 500;
  const message = normalizedError.message || 'Internal Server Error';

  logger.error('Request failed', {
    method: req.method,
    url: req.originalUrl,
    statusCode,
    message,
    stack: error.stack,
  });

  const response = {
    success: false,
    message,
  };

  if (env.nodeEnv === 'development') {
    response.stack = error.stack;
  }

  return res.status(statusCode).json(response);
};

export default errorHandler;
