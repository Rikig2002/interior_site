import AppError from '../utils/AppError.js';
import pricingConfig from '../config/pricing.config.js';

const VALID_PROPERTY_TYPES = ['1bhk', '2bhk', '3bhk', 'villa'];
const VALID_DESIGN_TYPES = ['basic', 'premium', 'luxury'];
const VALID_ROOMS = ['kitchen', 'wardrobe', 'livingRoom'];

const toSafeNumber = (value, fieldName) => {
  const numeric = Number(value);
  if (Number.isNaN(numeric)) {
    throw new AppError(`${fieldName} must be a valid number`, 400);
  }
  return numeric;
};

const normalizePropertyType = (propertyType) => String(propertyType || '').trim().toLowerCase();
const normalizeDesignType = (designType) => String(designType || '').trim().toLowerCase();

const normalizeRooms = (rooms) => {
  if (rooms === undefined || rooms === null) {
    return [];
  }

  if (!Array.isArray(rooms)) {
    throw new AppError('rooms must be an array', 400);
  }

  return rooms.map((room) => String(room).trim());
};

const normalizeCity = (city) => {
  if (!city) {
    return 'default';
  }

  return String(city).trim().toLowerCase();
};

const roundCurrency = (amount) => Math.round(amount);

export const calculatePrice = async (data) => {
  const propertyType = normalizePropertyType(data.propertyType);
  const designType = normalizeDesignType(data.designType);
  const area = toSafeNumber(data.area, 'area');
  const rooms = normalizeRooms(data.rooms);
  const city = normalizeCity(data.city);

  if (!propertyType) {
    throw new AppError('propertyType is required', 400);
  }

  if (!VALID_PROPERTY_TYPES.includes(propertyType)) {
    throw new AppError('Invalid propertyType. Allowed values: 1BHK, 2BHK, 3BHK, Villa', 400);
  }

  if (!designType) {
    throw new AppError('designType is required', 400);
  }

  if (!VALID_DESIGN_TYPES.includes(designType)) {
    throw new AppError('Invalid designType. Allowed values: basic, premium, luxury', 400);
  }

  if (area <= 0) {
    throw new AppError('area must be a positive number', 400);
  }

  const invalidRoom = rooms.find((room) => !VALID_ROOMS.includes(room));
  if (invalidRoom) {
    throw new AppError('Invalid room option. Allowed values: kitchen, wardrobe, livingRoom', 400);
  }

  const baseRate = pricingConfig.designType[designType].baseRate;
  const designMultiplier = pricingConfig.designType[designType].additionalMultiplier;
  const propertyMultiplier = pricingConfig.propertyTypeMultiplier[propertyType] || 1;
  const cityMultiplier = pricingConfig.cityMultiplier[city] || pricingConfig.cityMultiplier.default;

  const baseCost = area * baseRate;

  const roomCost = rooms.reduce((sum, room) => {
    return sum + (pricingConfig.roomCosts[room] || 0);
  }, 0);

  const additionalCost = Math.max(baseCost * (designMultiplier - 1), 0);

  const preMultiplierCost = baseCost + roomCost + additionalCost;
  const estimatedPrice = roundCurrency(preMultiplierCost * propertyMultiplier * cityMultiplier);

  const min = roundCurrency(estimatedPrice * pricingConfig.estimateRange.minFactor);
  const max = roundCurrency(estimatedPrice * pricingConfig.estimateRange.maxFactor);

  const costPerSqft = roundCurrency(estimatedPrice / area);

  return {
    estimatedPrice,
    priceRange: {
      min,
      max,
    },
    breakdown: {
      baseCost: roundCurrency(baseCost),
      roomCost: roundCurrency(roomCost),
      additionalCost: roundCurrency(additionalCost),
      propertyMultiplier,
      cityMultiplier,
      selectedRooms: rooms,
    },
    costPerSqft,
  };
};
