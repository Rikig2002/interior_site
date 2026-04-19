import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const BOOKING_STATUS = ['pending', 'confirmed', 'completed', 'cancelled'];

const bookingSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone is required'],
      trim: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true,
    },
    requirement: {
      type: String,
      trim: true,
    },
    preferredDate: {
      type: Date,
      required: [true, 'Preferred date is required'],
    },
    preferredTime: {
      type: String,
      required: [true, 'Preferred time is required'],
      trim: true,
    },
    status: {
      type: String,
      enum: BOOKING_STATUS,
      default: 'pending',
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    leadId: {
      type: Schema.Types.ObjectId,
      ref: 'Lead',
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

bookingSchema.index({ phone: 1, preferredDate: 1 });
bookingSchema.index({ preferredDate: 1 });
bookingSchema.index({ status: 1, preferredDate: 1 });
bookingSchema.index({ city: 1 });

const Booking = model('Booking', bookingSchema);

export { BOOKING_STATUS };
export default Booking;
