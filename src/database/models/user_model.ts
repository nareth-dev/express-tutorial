import mongoose from "mongoose";
import { userSchema } from "../schema/user_schema";

export const userModel = mongoose.model("user", userSchema);