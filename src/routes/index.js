import { Router } from 'express';
import healthRoutes from './health.routes.js';
import authRoutes from './auth.routes.js';
import leadRoutes from './lead.routes.js';
import projectRoutes from './project.routes.js';
import bookingRoutes from './booking.routes.js';
import pricingRoutes from './pricing.routes.js';
import dashboardRoutes from './dashboard.routes.js';

const router = Router();

router.use('/health', healthRoutes);
router.use('/auth', authRoutes);
router.use('/leads', leadRoutes);
router.use('/projects', projectRoutes);
router.use('/bookings', bookingRoutes);
router.use('/pricing', pricingRoutes);
router.use('/admin', dashboardRoutes);

export default router;
