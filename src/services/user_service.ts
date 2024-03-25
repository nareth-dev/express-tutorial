import bcrypt from "bcrypt";
import { generateToken } from "../utils/util";
import UserRepo from "../database/repository/user_repo";
import { userModel } from "../database/models/user_model";

class UserService {
  private userRepo: UserRepo;
  constructor() {
    this.userRepo = new UserRepo();
  }
  async signUp(userData: { email: string; password: string }) {
    const { email, password } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.userRepo.saveUser({
      email,
      password: hashedPassword,
    });
    const token = generateToken(newUser);
    return { newUser, token };
  }
}

export default  UserService;
