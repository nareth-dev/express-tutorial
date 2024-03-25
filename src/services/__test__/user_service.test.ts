import bcrypt from "bcrypt";
import { generateToken } from "../../utils/util";
import { MongoMemoryServer } from "mongodb-memory-server";
//import { ConnectOptions } from "mongoose";
import mongoose from "mongoose";
import UserService from "../user_service";
import UserRepo from "../../database/repository/user_repo";
jest.mock("bcrypt");
jest.mock("../../database/repository/user_repo");
jest.mock("../../utils/util");

let mongoServer: MongoMemoryServer;
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("UserService", () => {
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService();
  });

  describe("signUp", () => {
    it("should sign up a new user", async () => {
      const userData = { email: "test@example.com", password: "password" };
      const hashedPassword = "hashedPassword";
      const newUser = { email: userData.email, password: hashedPassword };
      const token = "token";

      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
      (UserRepo.prototype.saveUser as jest.Mock).mockResolvedValue(newUser);
      (generateToken as jest.Mock).mockReturnValue(token);

      const result = await userService.signUp(userData);

      expect(result).toEqual({ newUser, token });
      expect(bcrypt.hash).toHaveBeenCalledWith(userData.password, 10);
      expect(UserRepo.prototype.saveUser).toHaveBeenCalledWith({
        email: userData.email,
        password: hashedPassword,
      });
      expect(generateToken).toHaveBeenCalledWith(newUser);
    });
  });
});
