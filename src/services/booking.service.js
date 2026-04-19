import mongoose from 'mongoose';
import AppError from '../utils/AppError.js';
import Booking, { BOOKING_STATUS } from '../models/booking.model.js';
import Lead from '../models/lead.model.js';
import User from '../models/user.model.js';

const ALLOWED_UPDATE_FIELDS = ['status', 'assignedTo', 'notes'];
const TIME_SLOT_REGEX = /^([1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)\s?-\s?([1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/i;

const toCleanString = (value) => {
  if (typeof value !== 'string') {
    return value;
  }

  return value.trim();
};

const normalizePhone = (phone) => String(phone || '').replace(/[\s()-]/g, '').trim();
const isValidPhone = (phone) => /^\+?[0-9]{7,15}$/.test(phone);
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const parseHour = (value, meridian) => {
  let hour = Number(value);
  if (meridian.toUpperCase() === 'AM') {
    if (hour === 12) {
      hour = 0;
    }
  } else if (hour !== 12) {
    hour += 12;
  }
  return hour;
};

const parseTimeSlot = (slot) => {
  const match = TIME_SLOT_REGEX.exec(slot);
  if (!match) {
    return null;
  }

  const startHour = parseHour(match[1], match[2]);
  const endHour = parseHour(match[3], match[4]);

  return {
    startHour,
    endHour,
  };
};

const validateTimeSlot = (slot) => {
  const parsed = parseTimeSlot(slot);
  if (!parsed) {
    throw new AppError('Invalid preferredTime format. Use format like 10:00 AM - 11:00 AM', 400);
  }

  if (parsed.endHour <= parsed.startHour) {
    throw new AppError('Invalid preferredTime. End time must be after start time', 400);
  }

  if (parsed.startHour < 10 || parsed.endHour > 18) {
    throw new AppError('Preferred time must be within working hours (10:00 AM - 6:00 PM)', 400);
  }
};

const normalizeDate = (inputDate) => {
  const date = new Date(inputDate);
  if (Number.isNaN(date.getTime())) {
    throw new AppError('Invalid preferredDate', 400);
  }

  return date;
};

const getDateBounds = (date) => {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setDate(end.getDate() + 1);

  return { start, end };
};

const ensureFutureDate = (date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const bookingDay = new Date(date);
  bookingDay.setHours(0, 0, 0, 0);

  if (bookingDay <= today) {
    throw new AppError('preferredDate must be a future date', 400);
  }
};

export const createBooking = async (data) => {
  const name = toCleanString(data.name);
  const phone = normalizePhone(data.phone);
  const email = data.email ? toCleanString(data.email).toLowerCase() : undefined;
  const city = toCleanString(data.city);
  const requirement = toCleanString(data.requirement);
  const preferredTime = toCleanString(data.preferredTime);
  const notes = toCleanString(data.notes);

  if (!name || !phone || !city || !data.preferredDate || !preferredTime) {
    throw new AppError('Name, phone, city, preferredDate, and preferredTime are required', 400);
  }

  if (!isValidPhone(phone)) {
    throw new AppError('Phone format is invalid', 400);
  }

  if (email && !isValidEmail(email)) {
    throw new AppError('Email format is invalid', 400);
  }

  validateTimeSlot(preferredTime);

  const preferredDate = normalizeDate(data.preferredDate);
  ensureFutureDate(preferredDate);

  const { start, end } = getDateBounds(preferredDate);

  const duplicateForPhone = await Booking.findOne({
    phone,
    preferredDate: { $gte: start, $lt: end },
  });

  if (duplicateForPhone) {
    throw new AppError('Duplicate booking detected for this phone on the selected date', 409);
  }

  const slotConflict = await Booking.findOne({
    preferredDate: { $gte: start, $lt: end },
    preferredTime,
    status: { $in: ['pending', 'confirmed'] },
  });

  if (slotConflict) {
    throw new AppError('Selected time slot is already booked. Please choose another slot', 409);
  }

  const linkedLead = await Lead.findOne({ phone }).sort({ createdAt: -1 });

  const booking = await Booking.create({
    name,
    phone,
    email,
    city,
    requirement,
    preferredDate,
    preferredTime,
    status: 'pending',
    leadId: linkedLead?._id,
    notes,
  });

  return booking;
};

export const getBookings = async (queryParams) => {
  const page = Math.max(Number(queryParams.page) || 1, 1);
  const limit = Math.min(Math.max(Number(queryParams.limit) || 10, 1), 100);
  const skip = (page - 1) * limit;

  const filters = {};

  if (queryParams.status) {
    const status = String(queryParams.status).toLowerCase().trim();
    if (!BOOKING_STATUS.includes(status)) {
      throw new AppError('Invalid status filter', 400);
    }
    filters.status = status;
  }

  if (queryParams.city) {
    filters.city = { $regex: `^${String(queryParams.city).trim()}$`, $options: 'i' };
  }

  const from = queryParams.from || queryParams.startDate;
  const to = queryParams.to || queryParams.endDate;
  if (from || to) {
    filters.preferredDate = {};

    if (from) {
      const fromDate = normalizeDate(from);
      filters.preferredDate.$gte = fromDate;
    }

    if (to) {
      const toDate = normalizeDate(to);
      filters.preferredDate.$lte = toDate;
    }
  }

  const [total, bookings] = await Promise.all([
    Booking.countDocuments(filters),
    Booking.find(filters)
      .sort({ preferredDate: 1, createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('name phone email city requirement preferredDate preferredTime status assignedTo leadId notes createdAt updatedAt')
      .populate('assignedTo', 'name email role')
      .populate('leadId', 'name email phone status city')
      .lean(),
  ]);

  return {
    total,
    page,
    pages: Math.ceil(total / limit) || 1,
    data: bookings,
  };
};

export const getBookingById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError('Invalid booking id', 400);
  }

  const booking = await Booking.findById(id)
    .select('name phone email city requirement preferredDate preferredTime status assignedTo leadId notes createdAt updatedAt')
    .populate('assignedTo', 'name email role')
    .populate('leadId', 'name email phone status city')
    .lean();

  if (!booking) {
    throw new AppError('Booking not found', 404);
  }

  return booking;
};

export const updateBooking = async (id, updateData) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError('Invalid booking id', 400);
  }

  const updatePayload = {};
  for (const field of ALLOWED_UPDATE_FIELDS) {
    if (updateData[field] !== undefined) {
      updatePayload[field] = updateData[field];
    }
  }

  if (updatePayload.status) {
    const normalizedStatus = String(updatePayload.status).toLowerCase().trim();
    if (!BOOKING_STATUS.includes(normalizedStatus)) {
      throw new AppError('Invalid status value', 400);
    }
    updatePayload.status = normalizedStatus;
  }

  if (updatePayload.notes !== undefined) {
    updatePayload.notes = toCleanString(updatePayload.notes);
  }

  if (updatePayload.assignedTo !== undefined && updatePayload.assignedTo !== null && updatePayload.assignedTo !== '') {
    if (!mongoose.Types.ObjectId.isValid(updatePayload.assignedTo)) {
      throw new AppError('Invalid assignedTo user id', 400);
    }

    const assignee = await User.findById(updatePayload.assignedTo);
    if (!assignee) {
      throw new AppError('Assigned user not found', 404);
    }
  }

  if (updatePayload.assignedTo === '' || updatePayload.assignedTo === null) {
    updatePayload.assignedTo = undefined;
  }

  const booking = await Booking.findByIdAndUpdate(id, updatePayload, {
    returnDocument: 'after',
    runValidators: true,
  })
    .populate('assignedTo', 'name email role')
    .populate('leadId', 'name email phone status city');

  if (!booking) {
    throw new AppError('Booking not found', 404);
  }

  return booking;
};

export const deleteBooking = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError('Invalid booking id', 400);
  }

  const booking = await Booking.findByIdAndDelete(id);

  if (!booking) {
    throw new AppError('Booking not found', 404);
  }

  return booking;
};
