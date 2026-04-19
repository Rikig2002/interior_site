import { Router } from 'express';
import { calculatePrice } from '../controllers/pricing.controller.js';
import validate from '../middlewares/validate.middleware.js';
import { calculatePricingSchema } from '../utils/validators/pricing.validator.js';

const router = Router();

router.post('/calculate', validate(calculatePricingSchema), calculatePrice);

export default router;
