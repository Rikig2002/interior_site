import Joi from 'joi';

const phoneRule = Joi.string().trim().pattern(/^\+?[0-9]{7,15}$/);
const idRule = Joi.string().trim().hex().length(24);

export const createLeadSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required(),
  phone: phoneRule.required(),
  email: Joi.string().trim().lowercase().email().allow('', null),
  city: Joi.string().trim().min(2).max(100).required(),
  requirement: Joi.string().trim().max(1000).allow('', null),
  source: Joi.string().trim().max(100).allow('', null),
  notes: Joi.string().trim().max(2000).allow('', null),
});

export const updateLeadSchema = Joi.object({
  status: Joi.string().valid('new', 'contacted', 'qualified', 'converted', 'closed'),
  notes: Joi.string().trim().max(2000).allow('', null),
  assignedTo: idRule.allow('', null),
}).min(1);
