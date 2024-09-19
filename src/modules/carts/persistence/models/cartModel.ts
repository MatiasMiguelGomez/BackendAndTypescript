import mongoose from 'mongoose';

const cartCollection = 'cart';

const cartSchema = new mongoose.Schema({
  products: [
    {
      _id: false,
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
});

export const cartModel = mongoose.model(cartCollection, cartSchema);
