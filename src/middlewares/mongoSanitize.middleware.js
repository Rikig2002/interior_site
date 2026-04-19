const isPlainObject = (value) => {
  return Object.prototype.toString.call(value) === '[object Object]';
};

const sanitizeNoSql = (value) => {
  if (Array.isArray(value)) {
    return value.map((item) => sanitizeNoSql(item));
  }

  if (!isPlainObject(value)) {
    return value;
  }

  const sanitizedEntries = Object.entries(value)
    .filter(([key]) => !key.startsWith('$') && !key.includes('.'))
    .map(([key, val]) => [key, sanitizeNoSql(val)]);

  return Object.fromEntries(sanitizedEntries);
};

const mongoSanitizeSafe = (req, res, next) => {
  if (req.body && typeof req.body === 'object') {
    req.body = sanitizeNoSql(req.body);
  }

  if (req.params && typeof req.params === 'object') {
    req.params = sanitizeNoSql(req.params);
  }

  next();
};

export default mongoSanitizeSafe;
