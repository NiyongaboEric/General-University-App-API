import mongoose from 'mongoose';

const { Schema } = mongoose;

const brandSchema = new Schema({
  brandName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  coverPhoto: {
    type: String,
    required: true,
  },
  userLocation: {
    required: true,
    type: [Object],
  },
  ownerContact: {
    required: true,
    type: String,
  },
  witnessContactOne: {
    required: true,
    type: String,
  },
  witnessContactTwo: {
    required: true,
    type: String,
  },
  isPhoneVerified: {
    type: Boolean,
    default: false,
  },
  aboutBrand: {
    type: String,
    default: null,
  },
  category: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  profile: {
    type: Schema.Types.ObjectId,
    ref: 'Profile',
  },
}, { timestamps: true });

export default mongoose.model('Brand', brandSchema);
