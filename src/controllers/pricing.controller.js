import { calculatePrice as calculatePriceService } from '../services/pricing.service.js';

export const calculatePrice = async (req, res, next) => {
  try {
    const result = await calculatePriceService(req.body);

    return res.status(200).json({
      success: true,
      message: 'Pricing calculated successfully',
      data: result,
    });
  } catch (error) {
    return next(error);
  }
};
