import { Router } from 'express';
import {
  getBookingsAnalytics,
  getDashboardStats,
  getLeadsAnalytics,
} from '../controllers/dashboard.controller.js';
import { authorizeRoles, protect } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(protect, authorizeRoles('admin'));

router.get('/dashboard', getDashboardStats);
router.get('/analytics/leads', getLeadsAnalytics);
router.get('/analytics/bookings', getBookingsAnalytics);

export default router;
