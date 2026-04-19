import mongoose from 'mongoose';
import AppError from '../utils/AppError.js';

const { Schema, model } = mongoose;

const CATEGORY_ENUM = ['kitchen', 'bedroom', 'living-room', 'wardrobe', 'full-home'];

const slugify = (value) => {
  return String(value || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

const projectSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    images: {
      type: [String],
      required: [true, 'At least one image is required'],
      validate: {
        validator: (value) => Array.isArray(value) && value.length > 0,
        message: 'At least one image is required',
      },
    },
    category: {
      type: String,
      enum: CATEGORY_ENUM,
      required: [true, 'Category is required'],
    },
    subCategory: {
      type: String,
      trim: true,
    },
    priceRange: {
      type: String,
      trim: true,
    },
    budget: {
      type: Number,
      min: [0, 'Budget cannot be negative'],
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true,
    },
    area: {
      type: Number,
      min: [0, 'Area cannot be negative'],
    },
    bhkType: {
      type: String,
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    features: {
      type: [String],
      default: [],
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

projectSchema.pre('validate', async function ensureUniqueSlug() {
  if (!this.isModified('title') && this.slug) {
    return;
  }

  const baseSlug = slugify(this.title);
  if (!baseSlug) {
    throw new AppError('Invalid title for slug generation', 400);
  }

  let candidateSlug = baseSlug;
  let counter = 1;

  while (true) {
    const existing = await this.constructor.findOne({ slug: candidateSlug });
    if (!existing || existing._id.equals(this._id)) {
      break;
    }

    candidateSlug = `${baseSlug}-${counter}`;
    counter += 1;
  }

  this.slug = candidateSlug;
});

projectSchema.index({ category: 1, city: 1, createdAt: -1 });
projectSchema.index({ isPublished: 1, isFeatured: -1, createdAt: -1 });

const Project = model('Project', projectSchema);

export { slugify, CATEGORY_ENUM };
export default Project;
