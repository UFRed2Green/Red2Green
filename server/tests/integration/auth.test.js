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

// Inject prisma mock into router (if not passed, use a pattern like dependency injection)
jest.unstable_mockModule("../../src/prisma-client.js", () => ({
  default: prisma,
}));

const { default: router } = await import("../../src/routes/auth-routes.js");

const app = express();
app.use(express.json());
app.use("/auth", router);

describe("Auth Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /auth/register", () => {
    it("should register a new user and return a JWT", async () => {
      const fakeUser = { id: 1, email: "test@example.com" };
      prisma.user.create.mockResolvedValue(fakeUser);

      const res = await request(app)
        .post("/auth/register")
        .send({
          first_name: "John",
          last_name: "Doe",
          email: "test@example.com",
          password: "password123",
        });

      expect(res.status).toBe(200);
      expect(res.body.token).toBeDefined();

      const decoded = jwt.verify(res.body.token, process.env.JWT_SECRET);
      expect(decoded.id).toBe(fakeUser.id);
      expect(prisma.user.create).toHaveBeenCalledTimes(1);
    });

    it("should handle DB errors gracefully", async () => {
      prisma.user.create.mockRejectedValue(new Error("DB error"));

      const res = await request(app)
        .post("/auth/register")
        .send({
          first_name: "Error",
          last_name: "Test",
          email: "err@example.com",
          password: "123",
        });

      expect(res.status).toBe(500);
      expect(res.body.error).toBe("Database error");
    });
  });

  describe("POST /auth/login", () => {
    it("should log in valid user and return token", async () => {
      const hashedPassword = bcrypt.hashSync("password123", 10);
      const fakeUser = { id: 1, email: "test@example.com", password: hashedPassword };
      prisma.user.findUnique.mockResolvedValue(fakeUser);

      const res = await request(app)
        .post("/auth/login")
        .send({ email: "test@example.com", password: "password123" });

      expect(res.status).toBe(200);
      expect(res.body.token).toBeDefined();

      const decoded = jwt.verify(res.body.token, process.env.JWT_SECRET);
      expect(decoded.id).toBe(fakeUser.id);
    });

    it("should reject invalid email", async () => {
      prisma.user.findUnique.mockResolvedValue(null);

      const res = await request(app)
        .post("/auth/login")
        .send({ email: "wrong@example.com", password: "123" });

      expect(res.status).toBe(401);
      expect(res.body.error).toBe("Invalid email or password");
    });

    it("should reject wrong password", async () => {
      const fakeUser = { email: "test@example.com", password: bcrypt.hashSync("correct", 10) };
      prisma.user.findUnique.mockResolvedValue(fakeUser);

      const res = await request(app)
        .post("/auth/login")
        .send({ email: "test@example.com", password: "wrong" });

      expect(res.status).toBe(401);
      expect(res.body.error).toBe("Invalid email or password");
    });

    it("should handle DB errors gracefully", async () => {
      prisma.user.findUnique.mockRejectedValue(new Error("DB fail"));

      const res = await request(app)
        .post("/auth/login")
        .send({ email: "fail@example.com", password: "123" });

      expect(res.status).toBe(500);
      expect(res.body.error).toBe("Database error");
    });
  });
});