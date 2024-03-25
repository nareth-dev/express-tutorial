
import mongoose, { ConnectOptions } from 'mongoose';
import { userModel } from '../user_model';

describe("User Model", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://localhost:27017/school", {
      useNewUrlParser: true,
      useUnifiedTopology: true, 
    } as ConnectOptions);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await userModel.deleteMany({});
  });

  it("should create a new user", async () => {
    const userData = {
      email: "user@email.com",
      password: "123456",
    };

    const user = await userModel.create(userData);
    expect(user.email).toBe("user@email.com");
    expect(user.password).toBe("123456");
  });

  it("should require email and password", async () => {
    const userData = {};
    let error: mongoose.Error.ValidationError | undefined;
    try {
      await userModel.create(userData);
    } catch (e) {
      error = e as mongoose.Error.ValidationError;
    }

    expect(error).toBeDefined();
    expect(error!.errors.email).toBeDefined(); 
    expect(error!.errors.password).toBeDefined();
  });
});

