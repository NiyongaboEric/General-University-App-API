import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    default: null,
  },
  signupType: {
    type: String,
    required: true,
  },
  publicId: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    default: null,
  },
  smsCode: {
    type: Number,
    default: null,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  profile: {
    type: Schema.Types.ObjectId,
    ref: 'Profile',
  },
}, { timestamps: true });

export default mongoose.model('User', userSchema);
