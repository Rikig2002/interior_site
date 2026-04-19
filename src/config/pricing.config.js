const pricingConfig = {
  propertyTypeMultiplier: {
    '1bhk': 1,
    '2bhk': 1.08,
    '3bhk': 1.16,
    villa: 1.3,
  },
  designType: {
    basic: {
      baseRate: 1200,
      additionalMultiplier: 1,
    },
    premium: {
      baseRate: 1800,
      additionalMultiplier: 1.05,
    },
    luxury: {
      baseRate: 2500,
      additionalMultiplier: 1.12,
    },
  },
  roomCosts: {
    kitchen: 80000,
    wardrobe: 50000,
    livingRoom: 60000,
  },
  cityMultiplier: {
    mumbai: 1.12,
    bangalore: 1.08,
    delhi: 1.1,
    pune: 1.03,
    hyderabad: 1.04,
    default: 1,
  },
  estimateRange: {
    minFactor: 0.9,
    maxFactor: 1.15,
  },
};

export default pricingConfig;
