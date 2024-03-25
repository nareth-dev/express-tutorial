import { userModel } from "../models/user_model";

class UserRepo {
  async saveUser(user: { email: string; password: string }) {
    return await userModel.create(user);
  }
}
export default UserRepo;
