import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
  user: {
    type: String,
    require: true,
  },
  message: {
    type: String,
    require: true,
  },
});

export default messageSchema;


