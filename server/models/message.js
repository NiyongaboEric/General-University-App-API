import mongoose from 'mongoose';

const { Schema } = mongoose;

const messageSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  from: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: 'Brand',
  },
  publicId: {
    type: String,
    required: true,
  },
  item: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  },
}, { timestamps: true });

export default mongoose.model('Message', messageSchema);
