import jwt from 'jsonwebtoken';
import env from '../config/env.js';
import AppError from '../utils/AppError.js';
import User from '../models/user.model.js';

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || '';
    const hasBearerToken = authHeader.startsWith('Bearer ');

    if (!hasBearerToken) {
      throw new AppError('Unauthorized access. Token missing', 401);
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, env.jwtSecret);

    const user = await User.findById(decoded.userId);
    if (!user) {
      throw new AppError('Unauthorized access. User not found', 401);
    }

    req.user = user;
    return next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return next(new AppError('Unauthorized access. Token expired', 401));
    }

    if (error.name === 'JsonWebTokenError') {
      return next(new AppError('Unauthorized access. Invalid token', 401));
    }

    return next(error);
  }
};

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new AppError('Unauthorized access', 401));
    }

    if (!roles.includes(req.user.role)) {
      return next(new AppError('Forbidden. You do not have permission', 403));
    }

    return next();
  };
};
