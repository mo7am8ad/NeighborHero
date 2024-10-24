import mongoose, { Types } from 'mongoose';
const { Schema } = mongoose;

const ServiceSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  catigory: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  cover: {
    type: String,
    required: false,
  },
  images: {
    type: [String],
    required: false,
  },
  sales: {
    type: Number,
    default: 0,
  },
  districts: {
    type: [String], // New field for districts
    required: true,
  },
}, {
  timestamps: true,
});

export default mongoose.model("Service", ServiceSchema);
