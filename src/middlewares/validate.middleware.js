import AppError from '../utils/AppError.js';

const validate = (schema, target = 'body') => {
  return (req, res, next) => {
    const data = req[target];
    const { error, value } = schema.validate(data, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const message = error.details.map((detail) => detail.message).join(', ');
      return next(new AppError(message, 400));
    }

    req[target] = value;
    return next();
  };
};

export default validate;
