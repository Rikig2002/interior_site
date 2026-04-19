import { Router } from 'express';
import {
  createBooking,
  deleteBooking,
  getAllBookings,
  getBooking,
  updateBooking,
} from '../controllers/booking.controller.js';
import { authorizeRoles, protect } from '../middlewares/auth.middleware.js';
import validate from '../middlewares/validate.middleware.js';
import { createBookingSchema, updateBookingSchema } from '../utils/validators/booking.validator.js';

const router = Router();

router.post('/', validate(createBookingSchema), createBooking);

router.use(protect, authorizeRoles('admin'));

router.get('/', getAllBookings);
router.get('/:id', getBooking);
router.patch('/:id', validate(updateBookingSchema), updateBooking);
router.delete('/:id', deleteBooking);

export default router;
