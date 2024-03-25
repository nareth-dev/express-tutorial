import request from "supertest";
import app from "../../app";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

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

describe("POST /user", () => {
  it("should create a new user when provided with valid input", async () => {
    const MOCK_USER = {
      email: "test_user@example.com",
      password: "test_user@1234",
    };

    const response = await request(app)
      .post("/user")
      .send(MOCK_USER)
      .expect("Content-Type", /json/)
      .expect(201);

       // Assertions
       expect(response.body.status).toBe("success");
       expect(response.body.message).toBe("User added successfully!!!");
       expect(response.body.data).toHaveProperty("newUser");
       expect(response.body.data).toHaveProperty("token");
  }, 50000);
});