import xss from 'xss';

const sanitizeValue = (value) => {
  if (typeof value === 'string') {
    return xss(value);
  }

  if (Array.isArray(value)) {
    return value.map((item) => sanitizeValue(item));
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, val]) => [key, sanitizeValue(val)])
    );
  }

  return value;
};

const sanitizeInPlace = (target) => {
  if (!target || typeof target !== 'object') {
    return;
  }

  for (const key of Object.keys(target)) {
    target[key] = sanitizeValue(target[key]);
  }
};

const xssSanitize = (req, res, next) => {
  if (req.body && typeof req.body === 'object') {
    sanitizeInPlace(req.body);
  }

  if (req.params && typeof req.params === 'object') {
    sanitizeInPlace(req.params);
  }

  next();
};

export default xssSanitize;
