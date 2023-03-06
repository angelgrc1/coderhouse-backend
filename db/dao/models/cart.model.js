import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
  products: {
    type: [String],
  },
});

export default cartSchema;
