import request from "supertest";
import express from "express";
import { jest } from "@jest/globals";

const prisma = {
  trade: { create: jest.fn() },
};

jest.unstable_mockModule("../../src/prisma-client.js", () => ({
  default: prisma,
}));

const { default: router } = await import("../../src/routes/trade-routes.js");

const app = express();
app.use(express.json());

app.use("/api/trades", (req, res, next) => {
  req.userId = 1;
  req.tradeDate = new Date().toISOString();
  next();
});
app.use("/api/trades", router);

beforeEach(() => {
  jest.clearAllMocks();
});

describe("POST /api/trades (Integration)", () => {
  it("should add a trade successfully", async () => {
    const fakeTrade = {
      ticker: "AAPL",
      tradeType: "BUY",
      quantity: 10,
      price: 150,
    };
    prisma.trade.create.mockResolvedValue(fakeTrade);

    const res = await request(app)
      .post("/api/trades")
      .send({
        ticker: "AAPL",
        tradeType: "BUY",
        quantity: 10,
        price: 150,
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toMatchObject(fakeTrade);
    expect(res.body.message).toBe("Trade added successfully");
  });

  it("should return validation error for bad input", async () => {
    const res = await request(app)
      .post("/api/trades")
      .send({
        ticker: "",
        tradeType: "INVALID",
        quantity: -5,
        price: "wrong",
      });

    expect(res.status).toBe(500);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe("TRADE_ADD_FAILED");
    });

  it("should handle DB error gracefully", async () => {
    prisma.trade.create.mockRejectedValue(new Error("DB failure"));

    const res = await request(app)
      .post("/api/trades")
      .send({
        ticker: "TSLA",
        tradeType: "SELL",
        quantity: 5,
        price: 300,
      });

    expect(res.status).toBe(500);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe("TRADE_ADD_FAILED");
    expect(res.body.error.message).toBe("DB failure");
  });
});
