import mongoose from 'mongoose';

const { Schema } = mongoose;

const categorySchema = new Schema({
  itemPrice: {
    type: String,
    required: true,
  },
  itemPriceDiscount: {
    type: String,
    required: true,
  },
  itemPriceCurrency: {
    type: String,
    required: true,
  },
  itemRemainder: {
    type: String,
    required: true,
  },
  itemImageOne: {
    type: String,
    required: true,
  },
  itemImageTwo: {
    type: String,
    required: true,
  },
  itemImageThree: {
    type: String,
    required: true,
  },
  location: {
    required: true,
    type: [Object],
  },
  itemCategory: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },
  subItemType: {
    type: String,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  itemType: {
    type: String,
    required: true,
  },
  itemStatus: {
    type: String,
    required: true,
  },
  itemComment: {
    type: String,
    default: null,
  },
  publicId: {
    type: String,
    required: true,
  },
  brand: {
    type: Schema.Types.ObjectId,
    ref: 'Brand',
  },
}, { timestamps: true });

export default mongoose.model('Category', categorySchema);
