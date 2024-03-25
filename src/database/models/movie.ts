import mongoose from "mongoose";
const MovieSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  released_on: {
    type: Date,
    trim: true,
    required: true,
  },
});
export const movieModel = mongoose.model("Movie", MovieSchema);
