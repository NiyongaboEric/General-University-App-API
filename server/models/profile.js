import mongoose from 'mongoose';

const { Schema } = mongoose;

const profileSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      required: false,
    },
    jobPosition: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    gender: {
      type: String,
      required: false,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  }, { timestamps: true },
);

export default mongoose.model('Profile', profileSchema);
