import mongoose from 'mongoose';
import AppError from '../utils/AppError.js';
import Project, { CATEGORY_ENUM } from '../models/project.model.js';

const toCleanString = (value) => {
  if (typeof value !== 'string') {
    return value;
  }

  return value.trim();
};

const hasValue = (value) => value !== undefined && value !== null;

const toStringArray = (value) => {
  if (!value) {
    return [];
  }

  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }

  return String(value)
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
};

const parseBooleanQuery = (value) => {
  if (value === undefined) {
    return undefined;
  }

  if (typeof value === 'boolean') {
    return value;
  }

  const normalized = String(value).toLowerCase().trim();

  if (normalized === 'true') {
    return true;
  }

  if (normalized === 'false') {
    return false;
  }

  throw new AppError('Invalid boolean query value', 400);
};

const sanitizeProjectPayload = (data) => {
  const sanitized = {};

  if (hasValue(data.title)) {
    sanitized.title = toCleanString(data.title);
  }

  if (hasValue(data.description)) {
    sanitized.description = toCleanString(data.description);
  }

  if (hasValue(data.images)) {
    sanitized.images = toStringArray(data.images);
  }

  if (hasValue(data.category)) {
    sanitized.category = String(data.category).toLowerCase().trim();
  }

  if (hasValue(data.subCategory)) {
    sanitized.subCategory = toCleanString(data.subCategory);
  }

  if (hasValue(data.priceRange)) {
    sanitized.priceRange = toCleanString(data.priceRange);
  }

  if (hasValue(data.city)) {
    sanitized.city = toCleanString(data.city);
  }

  if (hasValue(data.bhkType)) {
    sanitized.bhkType = toCleanString(data.bhkType);
  }

  if (hasValue(data.tags)) {
    sanitized.tags = toStringArray(data.tags);
  }

  if (hasValue(data.features)) {
    sanitized.features = toStringArray(data.features);
  }

  if (hasValue(data.isFeatured)) {
    sanitized.isFeatured = data.isFeatured;
  }

  if (hasValue(data.isPublished)) {
    sanitized.isPublished = data.isPublished;
  }

  if (hasValue(data.createdBy)) {
    sanitized.createdBy = data.createdBy;
  }

  if (data.budget !== undefined && data.budget !== null && data.budget !== '') {
    const budget = Number(data.budget);
    if (Number.isNaN(budget) || budget < 0) {
      throw new AppError('Budget must be a valid non-negative number', 400);
    }
    sanitized.budget = budget;
  }

  if (data.area !== undefined && data.area !== null && data.area !== '') {
    const area = Number(data.area);
    if (Number.isNaN(area) || area < 0) {
      throw new AppError('Area must be a valid non-negative number', 400);
    }
    sanitized.area = area;
  }

  return sanitized;
};

export const createProject = async (data, user) => {
  const payload = sanitizeProjectPayload(data);

  if (!payload.title || !payload.description || !payload.city || !payload.category) {
    throw new AppError('Title, description, category, and city are required', 400);
  }

  if (!payload.images || payload.images.length === 0) {
    throw new AppError('At least one image is required', 400);
  }

  if (!CATEGORY_ENUM.includes(payload.category)) {
    throw new AppError('Invalid category', 400);
  }

  if (payload.isFeatured !== undefined) {
    payload.isFeatured = Boolean(payload.isFeatured);
  }

  if (payload.isPublished !== undefined) {
    payload.isPublished = Boolean(payload.isPublished);
  }

  payload.createdBy = user?._id;

  const project = await Project.create(payload);
  return project;
};

export const getProjects = async (queryParams) => {
  const page = Math.max(Number(queryParams.page) || 1, 1);
  const limit = Math.min(Math.max(Number(queryParams.limit) || 12, 1), 100);
  const skip = (page - 1) * limit;

  const filters = {
    isPublished: true,
  };

  if (queryParams.category) {
    const category = String(queryParams.category).toLowerCase().trim();
    if (!CATEGORY_ENUM.includes(category)) {
      throw new AppError('Invalid category filter', 400);
    }
    filters.category = category;
  }

  if (queryParams.city) {
    filters.city = { $regex: `^${String(queryParams.city).trim()}$`, $options: 'i' };
  }

  if (queryParams.priceRange) {
    filters.priceRange = { $regex: `^${String(queryParams.priceRange).trim()}$`, $options: 'i' };
  }

  if (queryParams.isFeatured !== undefined) {
    filters.isFeatured = parseBooleanQuery(queryParams.isFeatured);
  }

  if (queryParams.search) {
    const search = String(queryParams.search).trim();
    if (search) {
      filters.$or = [
        { title: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
      ];
    }
  }

  const sortQuery = String(queryParams.sort || 'latest').toLowerCase();
  const sort = sortQuery === 'featured' ? { isFeatured: -1, createdAt: -1 } : { createdAt: -1 };

  const [total, projects] = await Promise.all([
    Project.countDocuments(filters),
    Project.find(filters)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .select('title slug description images category subCategory priceRange budget city area bhkType tags features isFeatured isPublished createdBy createdAt updatedAt')
      .populate('createdBy', 'name email role')
      .lean(),
  ]);

  return {
    total,
    page,
    pages: Math.ceil(total / limit) || 1,
    data: projects,
  };
};

export const getProjectById = async (idOrSlug) => {
  const lookup = mongoose.Types.ObjectId.isValid(idOrSlug)
    ? { _id: idOrSlug }
    : { slug: String(idOrSlug).toLowerCase().trim() };

  const project = await Project.findOne(lookup)
    .select('title slug description images category subCategory priceRange budget city area bhkType tags features isFeatured isPublished createdBy createdAt updatedAt')
    .populate('createdBy', 'name email role')
    .lean();

  if (!project) {
    throw new AppError('Project not found', 404);
  }

  if (!project.isPublished) {
    throw new AppError('Project not found', 404);
  }

  return project;
};

export const updateProject = async (id, data) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError('Invalid project id', 400);
  }

  const allowedFields = [
    'title',
    'description',
    'images',
    'category',
    'subCategory',
    'priceRange',
    'budget',
    'city',
    'area',
    'bhkType',
    'tags',
    'features',
    'isFeatured',
    'isPublished',
  ];

  const incomingPayload = Object.fromEntries(
    Object.entries(data).filter(([key]) => allowedFields.includes(key))
  );

  const payload = sanitizeProjectPayload(incomingPayload);

  if (payload.category && !CATEGORY_ENUM.includes(payload.category)) {
    throw new AppError('Invalid category', 400);
  }

  if (payload.images && payload.images.length === 0) {
    throw new AppError('At least one image is required', 400);
  }

  if (payload.isFeatured !== undefined) {
    payload.isFeatured = Boolean(payload.isFeatured);
  }

  if (payload.isPublished !== undefined) {
    payload.isPublished = Boolean(payload.isPublished);
  }

  const project = await Project.findById(id);

  if (!project) {
    throw new AppError('Project not found', 404);
  }

  Object.assign(project, payload);
  await project.save();

  return project;
};

export const deleteProject = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError('Invalid project id', 400);
  }

  const project = await Project.findByIdAndDelete(id);

  if (!project) {
    throw new AppError('Project not found', 404);
  }

  return project;
};
