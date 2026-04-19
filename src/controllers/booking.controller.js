import {
  createBooking as createBookingService,
  deleteBooking as deleteBookingService,
  getBookingById,
  getBookings,
  updateBooking as updateBookingService,
} from '../services/booking.service.js';

export const createBooking = async (req, res, next) => {
  try {
    const booking = await createBookingService(req.body);

    return res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: {
        booking,
      },
    });
  } catch (error) {
    return next(error);
  }
};

export const getAllBookings = async (req, res, next) => {
  try {
    const result = await getBookings(req.query);

    return res.status(200).json({
      success: true,
      message: 'Bookings fetched successfully',
      total: result.total,
      page: result.page,
      pages: result.pages,
      data: result.data,
    });
  } catch (error) {
    return next(error);
  }
};

export const getBooking = async (req, res, next) => {
  try {
    const booking = await getBookingById(req.params.id);

    return res.status(200).json({
      success: true,
      message: 'Booking fetched successfully',
      data: {
        booking,
      },
    });
  } catch (error) {
    return next(error);
  }
};

export const updateBooking = async (req, res, next) => {
  try {
    const booking = await updateBookingService(req.params.id, req.body);

    return res.status(200).json({
      success: true,
      message: 'Booking updated successfully',
      data: {
        booking,
      },
    });
  } catch (error) {
    return next(error);
  }
};

export const deleteBooking = async (req, res, next) => {
  try {
    const booking = await deleteBookingService(req.params.id);

    return res.status(200).json({
      success: true,
      message: 'Booking deleted successfully',
      data: {
        booking,
      },
    });
  } catch (error) {
    return next(error);
  }
};
