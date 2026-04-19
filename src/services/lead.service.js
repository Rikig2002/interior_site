import mongoose from 'mongoose';
import AppError from '../utils/AppError.js';
import Lead from '../models/lead.model.js';
import User from '../models/user.model.js';
import env from '../config/env.js';

const ALLOWED_STATUSES = ['new', 'contacted', 'qualified', 'converted', 'closed'];
const ALLOWED_UPDATE_FIELDS = ['status', 'notes', 'assignedTo'];

const sanitizeString = (value) => {
  if (typeof value !== 'string') {
    return value;
  }

  return value.trim();
};

const normalizePhone = (phone) => {
  const cleanedPhone = String(phone || '').replace(/[\s()-]/g, '');
  return cleanedPhone;
};

const isValidPhone = (phone) => /^\+?[0-9]{7,15}$/.test(phone);
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const buildDuplicateQuery = (phone, email, createdAfter) => {
  const conditions = [];

  if (phone) {
    conditions.push({ phone });
  }

  if (email) {
    conditions.push({ email });
  }

  return {
    $and: [{ $or: conditions }, { createdAt: { $gte: createdAfter } }],
  };
};

const getDuplicateConfig = () => {
  const strategy = (env.leadDuplicateStrategy || 'reject').toLowerCase();
  const windowMinutes = Number(env.leadDuplicateWindowMinutes) || 60;

  return {
    strategy: strategy === 'update' ? 'update' : 'reject',
    windowMinutes,
  };
};

export const createLead = async (data) => {
  const name = sanitizeString(data.name);
  const phone = normalizePhone(data.phone);
  const email = data.email ? sanitizeString(data.email).toLowerCase() : undefined;
  const city = sanitizeString(data.city);
  const requirement = sanitizeString(data.requirement);
  const source = sanitizeString(data.source) || 'website';
  const notes = sanitizeString(data.notes);

  if (!name || !phone || !city) {
    throw new AppError('Name, phone, and city are required', 400);
  }

  if (!isValidPhone(phone)) {
    throw new AppError('Phone format is invalid', 400);
  }

  if (email && !isValidEmail(email)) {
    throw new AppError('Email format is invalid', 400);
  }

  const duplicateQueryFields = [];
  if (phone) {
    duplicateQueryFields.push(phone);
  }
  if (email) {
    duplicateQueryFields.push(email);
  }

  const { strategy, windowMinutes } = getDuplicateConfig();

  if (duplicateQueryFields.length > 0) {
    const createdAfter = new Date(Date.now() - windowMinutes * 60 * 1000);
    const duplicateLead = await Lead.findOne(buildDuplicateQuery(phone, email, createdAfter)).sort({ createdAt: -1 });

    if (duplicateLead) {
      if (strategy === 'reject') {
        throw new AppError('Duplicate lead detected recently. Please follow up on existing lead', 409);
      }

      duplicateLead.name = name;
      duplicateLead.city = city;
      duplicateLead.requirement = requirement || duplicateLead.requirement;
      duplicateLead.source = source || duplicateLead.source;
      duplicateLead.notes = notes || duplicateLead.notes;

      if (email) {
        duplicateLead.email = email;
      }

      await duplicateLead.save();
      return duplicateLead;
    }
  }

  const lead = await Lead.create({
    name,
    phone,
    email,
    city,
    requirement,
    source,
    status: 'new',
    notes,
  });

  return lead;
};

export const getLeads = async (queryParams) => {
  const page = Math.max(Number(queryParams.page) || 1, 1);
  const limit = Math.min(Math.max(Number(queryParams.limit) || 10, 1), 100);
  const skip = (page - 1) * limit;

  const filters = {};

  if (queryParams.status) {
    const status = sanitizeString(queryParams.status).toLowerCase();
    if (!ALLOWED_STATUSES.includes(status)) {
      throw new AppError('Invalid status filter', 400);
    }
    filters.status = status;
  }

  if (queryParams.city) {
    filters.city = { $regex: `^${sanitizeString(queryParams.city)}$`, $options: 'i' };
  }

  const from = queryParams.from || queryParams.startDate;
  const to = queryParams.to || queryParams.endDate;
  if (from || to) {
    filters.createdAt = {};

    if (from) {
      const fromDate = new Date(from);
      if (Number.isNaN(fromDate.getTime())) {
        throw new AppError('Invalid from/startDate value', 400);
      }
      filters.createdAt.$gte = fromDate;
    }

    if (to) {
      const toDate = new Date(to);
      if (Number.isNaN(toDate.getTime())) {
        throw new AppError('Invalid to/endDate value', 400);
      }
      filters.createdAt.$lte = toDate;
    }
  }

  const [total, leads] = await Promise.all([
    Lead.countDocuments(filters),
    Lead.find(filters)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('name phone email city requirement source status notes assignedTo createdAt updatedAt')
      .populate('assignedTo', 'name email role')
      .lean(),
  ]);

  return {
    total,
    page,
    pages: Math.ceil(total / limit) || 1,
    data: leads,
  };
};

export const getLeadById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError('Invalid lead id', 400);
  }

  const lead = await Lead.findById(id)
    .select('name phone email city requirement source status notes assignedTo createdAt updatedAt')
    .populate('assignedTo', 'name email role')
    .lean();
  if (!lead) {
    throw new AppError('Lead not found', 404);
  }

  return lead;
};

export const updateLead = async (id, updateData) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError('Invalid lead id', 400);
  }

  const updatePayload = {};

  for (const key of ALLOWED_UPDATE_FIELDS) {
    if (updateData[key] !== undefined) {
      updatePayload[key] = updateData[key];
    }
  }

  if (updatePayload.status) {
    const normalizedStatus = sanitizeString(updatePayload.status).toLowerCase();
    if (!ALLOWED_STATUSES.includes(normalizedStatus)) {
      throw new AppError('Invalid status value', 400);
    }
    updatePayload.status = normalizedStatus;
  }

  if (updatePayload.notes !== undefined) {
    updatePayload.notes = sanitizeString(updatePayload.notes);
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

  const lead = await Lead.findByIdAndUpdate(id, updatePayload, {
    returnDocument: 'after',
    runValidators: true,
  }).populate('assignedTo', 'name email role');

  if (!lead) {
    throw new AppError('Lead not found', 404);
  }

  return lead;
};

export const deleteLead = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError('Invalid lead id', 400);
  }

  const lead = await Lead.findByIdAndDelete(id);

  if (!lead) {
    throw new AppError('Lead not found', 404);
  }

  return lead;
};
