import Joi from 'joi';

const phoneRule = Joi.string().trim().pattern(/^\+?[0-9]{7,15}$/);
const idRule = Joi.string().trim().hex().length(24);
const timeSlotRule = Joi.string()
  .trim()
  .pattern(/^([1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)\s?-\s?([1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/i);

export const createBookingSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required(),
  phone: phoneRule.required(),
  email: Joi.string().trim().lowercase().email().allow('', null),
  city: Joi.string().trim().min(2).max(100).required(),
  requirement: Joi.string().trim().max(1000).allow('', null),
  preferredDate: Joi.date().iso().required(),
  preferredTime: timeSlotRule.required(),
  notes: Joi.string().trim().max(2000).allow('', null),
});

export const updateBookingSchema = Joi.object({
  status: Joi.string().valid('pending', 'confirmed', 'completed', 'cancelled'),
  assignedTo: idRule.allow('', null),
  notes: Joi.string().trim().max(2000).allow('', null),
}).min(1);
