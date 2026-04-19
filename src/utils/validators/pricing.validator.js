import Joi from 'joi';

export const calculatePricingSchema = Joi.object({
  propertyType: Joi.string().trim().valid('1BHK', '2BHK', '3BHK', 'Villa', '1bhk', '2bhk', '3bhk', 'villa').required(),
  area: Joi.number().positive().required(),
  designType: Joi.string().trim().valid('basic', 'premium', 'luxury').required(),
  rooms: Joi.array().items(Joi.string().valid('kitchen', 'wardrobe', 'livingRoom')).default([]),
  city: Joi.string().trim().max(100).allow('', null),
});
