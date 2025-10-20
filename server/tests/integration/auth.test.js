import request from "supertest";
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { jest } from "@jest/globals";

// Mock Prisma client to isolate Database layer
const prisma = {
  user: {
    create: jest.fn(),
    findUnique: jest.fn(),
  },
};

// Mock environment variable
process.env.JWT_SECRET = "testsecret";

// Inject prisma mock into service layer
jest.unstable_mockModule("../../src/prisma-client.js", () => ({
  default: prisma,
}));

// Import after mocking
const { default: router } = await import("../../src/routes/auth-routes.js");

const app = express();
app.use(express.json());
app.use("/api/auth", router);

beforeEach(() => {
  jest.clearAllMocks();
});

describe("POST /api/auth/register", () => {
  it("should register a new user and return a token in success wrapper", async () => {
    const fakeUser = { id: 1, email: "test@example.com" };
    prisma.user.findUnique.mockResolvedValue(null);
    prisma.user.create.mockResolvedValue(fakeUser);

    const res = await request(app)
      .post("/api/auth/register")
      .send({
        firstName: "John",
        lastName: "Doe",
        email: "test@example.com",
        password: "password123",
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.token).toBeDefined();
    expect(res.body.message).toBe("User registered successfully");

    const decoded = jwt.verify(res.body.data.token, process.env.JWT_SECRET);
    expect(decoded.id).toBe(fakeUser.id);
    expect(prisma.user.create).toHaveBeenCalledTimes(1);
  });

  it("should return 409 if email already exists", async () => {
    prisma.user.findUnique.mockResolvedValue({ id: 99, email: "test@example.com" });

    const res = await request(app)
      .post("/api/auth/register")
      .send({
        firstName: "Dup",
        lastName: "User",
        email: "test@example.com",
        password: "password123",
      });

    expect(res.status).toBe(409);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe("REGISTER_FAILED");
    expect(res.body.error.message).toMatch(/already/i);
  });

  it("should handle DB errors gracefully", async () => {
    prisma.user.findUnique.mockResolvedValue(null);
    prisma.user.create.mockRejectedValue(new Error("DB error"));

    const res = await request(app)
      .post("/api/auth/register")
      .send({
        firstName: "Error",
        lastName: "Test",
        email: "err@example.com",
        password: "123",
      });

    expect(res.status).toBe(500);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe("REGISTER_FAILED");
    expect(res.body.error.message).toBe("DB error");
  });
});

describe("POST /api/auth/login", () => {
  it("should log in valid user and return token in success wrapper", async () => {
    const hashedPassword = bcrypt.hashSync("password123", 10);
    const fakeUser = { id: 1, email: "test@example.com", password: hashedPassword };
    prisma.user.findUnique.mockResolvedValue(fakeUser);

    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "test@example.com", password: "password123" });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.token).toBeDefined();
    expect(res.body.message).toBe("Login successful");

    const decoded = jwt.verify(res.body.data.token, process.env.JWT_SECRET);
    expect(decoded.id).toBe(fakeUser.id);
  });

  it("should reject invalid email", async () => {
    prisma.user.findUnique.mockResolvedValue(null);

    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "wrong@example.com", password: "123" });

    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe("LOGIN_FAILED");
    expect(res.body.error.message).toBe("Invalid email or password");
  });

  it("should reject wrong password", async () => {
    const fakeUser = { id: 1, email: "test@example.com", password: bcrypt.hashSync("correct", 10) };
    prisma.user.findUnique.mockResolvedValue(fakeUser);

    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "test@example.com", password: "wrong" });

    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe("LOGIN_FAILED");
    expect(res.body.error.message).toBe("Invalid email or password");
  });

  it("should handle DB errors gracefully", async () => {
    prisma.user.findUnique.mockRejectedValue(new Error("DB fail"));

    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "fail@example.com", password: "123" });

    expect(res.status).toBe(500);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe("LOGIN_FAILED");
    expect(res.body.error.message).toBe("DB fail");
  });
});
