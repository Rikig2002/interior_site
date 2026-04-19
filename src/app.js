import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import compression from 'compression';

import router from './routes/index.js';
import env from './config/env.js';
import notFoundHandler from './middlewares/notFound.middleware.js';
import errorHandler from './middlewares/error.middleware.js';
import requestLogger from './middlewares/requestLogger.middleware.js';
import xssSanitize from './middlewares/xssSanitize.middleware.js';
import mongoSanitizeSafe from './middlewares/mongoSanitize.middleware.js';

const app = express();

const limiter = rateLimit({
	windowMs: env.rateLimitWindowMs,
	limit: env.rateLimitMaxRequests,
	standardHeaders: true,
	legacyHeaders: false,
	message: {
		success: false,
		message: 'Too many requests, please try again later.',
	},
});

const corsOptions = {
	origin: (origin, callback) => {
		if (!origin || env.corsOrigins.includes(origin)) {
			return callback(null, true);
		}

		return callback(new Error('CORS policy does not allow this origin'));
	},
};

app.disable('x-powered-by');
app.use(helmet());
app.use(cors(corsOptions));
app.use(limiter);
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(xssSanitize);
app.use(mongoSanitizeSafe);
app.use(compression());
app.use(requestLogger);

app.use('/api', router);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
