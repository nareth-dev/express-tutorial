//  src/config/mongoose.ts
import mongoose from "mongoose";
const connectionToDatabase = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/school", {});
  } catch (error) {
    console.log("erroe connecting to MongoDB", error);
  }
};
export default connectionToDatabase;
// connection to db
