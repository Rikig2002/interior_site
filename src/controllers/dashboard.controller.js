import {
  getBookingsTrend,
  getDashboardStats as getDashboardStatsService,
  getLeadsTrend,
} from '../services/dashboard.service.js';

export const getDashboardStats = async (req, res, next) => {
  try {
    const data = await getDashboardStatsService();

    return res.status(200).json({
      success: true,
      message: 'Dashboard stats fetched successfully',
      data,
    });
  } catch (error) {
    return next(error);
  }
};

export const getLeadsAnalytics = async (req, res, next) => {
  try {
    const data = await getLeadsTrend(req.query);

    return res.status(200).json({
      success: true,
      message: 'Leads analytics fetched successfully',
      data,
    });
  } catch (error) {
    return next(error);
  }
};

export const getBookingsAnalytics = async (req, res, next) => {
  try {
    const data = await getBookingsTrend(req.query);

    return res.status(200).json({
      success: true,
      message: 'Bookings analytics fetched successfully',
      data,
    });
  } catch (error) {
    return next(error);
  }
};
