import mongoose from "mongoose";

mongoose.connect(process.env.MONGOOSE, (error) => {
  if (error) {
    console.log("Cannot connect to db");
    process.exit();
  }
});

export { mongoose };
