import Lead from '../models/lead.model.js';
import Booking from '../models/booking.model.js';
import Project from '../models/project.model.js';
import User from '../models/user.model.js';

const LEAD_STATUSES = ['new', 'contacted', 'qualified', 'converted', 'closed'];
const BOOKING_STATUSES = ['pending', 'confirmed', 'completed', 'cancelled'];

const statusArrayToMap = (rows, allowedStatuses) => {
  const result = Object.fromEntries(allowedStatuses.map((status) => [status, 0]));

  for (const row of rows) {
    if (result[row._id] !== undefined) {
      result[row._id] = row.count;
    }
  }

  return result;
};

const parseTrendParams = (query = {}) => {
  const period = String(query.period || 'daily').toLowerCase();
  const safePeriod = period === 'monthly' ? 'monthly' : 'daily';

  const defaultWindow = safePeriod === 'monthly' ? 12 : 30;
  const windowRaw = Number(query.window);
  const window = Number.isNaN(windowRaw) || windowRaw <= 0 ? defaultWindow : Math.min(windowRaw, 365);

  return {
    period: safePeriod,
    window,
  };
};

const buildTrendGroupId = (period) => {
  if (period === 'monthly') {
    return {
      year: { $year: '$createdAt' },
      month: { $month: '$createdAt' },
    };
  }

  return {
    year: { $year: '$createdAt' },
    month: { $month: '$createdAt' },
    day: { $dayOfMonth: '$createdAt' },
  };
};

const buildTrendLabel = (id, period) => {
  const year = String(id.year);
  const month = String(id.month).padStart(2, '0');

  if (period === 'monthly') {
    return `${year}-${month}`;
  }

  const day = String(id.day).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getTrendData = async (model, query = {}) => {
  const { period, window } = parseTrendParams(query);

  const sinceDate = new Date();
  if (period === 'monthly') {
    sinceDate.setMonth(sinceDate.getMonth() - window);
  } else {
    sinceDate.setDate(sinceDate.getDate() - window);
  }

  const grouped = await model.aggregate([
    { $match: { createdAt: { $gte: sinceDate } } },
    {
      $group: {
        _id: buildTrendGroupId(period),
        count: { $sum: 1 },
      },
    },
    {
      $sort: {
        '_id.year': 1,
        '_id.month': 1,
        '_id.day': 1,
      },
    },
  ]);

  const points = grouped.map((item) => ({
    label: buildTrendLabel(item._id, period),
    count: item.count,
  }));

  return {
    period,
    window,
    points,
  };
};

export const getDashboardStats = async () => {
  const [
    totalLeads,
    totalBookings,
    totalProjects,
    totalUsers,
    leadsByStatusRows,
    bookingsByStatusRows,
    recentLeads,
    recentBookings,
  ] = await Promise.all([
    Lead.countDocuments(),
    Booking.countDocuments(),
    Project.countDocuments(),
    User.countDocuments(),
    Lead.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]),
    Booking.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]),
    Lead.find({})
      .sort({ createdAt: -1 })
      .limit(10)
      .select('name phone email city status createdAt')
      .lean(),
    Booking.find({})
      .sort({ createdAt: -1 })
      .limit(10)
      .select('name phone email city preferredDate preferredTime status createdAt')
      .lean(),
  ]);

  return {
    totals: {
      totalLeads,
      totalBookings,
      totalProjects,
      totalUsers,
    },
    leadsByStatus: statusArrayToMap(leadsByStatusRows, LEAD_STATUSES),
    bookingsByStatus: statusArrayToMap(bookingsByStatusRows, BOOKING_STATUSES),
    recentLeads,
    recentBookings,
  };
};

export const getLeadsTrend = async (query) => {
  return getTrendData(Lead, query);
};

export const getBookingsTrend = async (query) => {
  return getTrendData(Booking, query);
};
