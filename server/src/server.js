import express from "express";
import authRoutes from "./routes/auth-routes.js";
import tradeRoutes from "./routes/trade-routes.js";
import emailRoutes from "./routes/email-routes.js";
import verifyToken from "./middleware/auth-middleware.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT ?? 5000;

//Help client and server run together
app.use(cors({ origin: true }));

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/trades", verifyToken, tradeRoutes);
app.use("/api/email", emailRoutes);
app.get("/", (req, res) => {
    res.send("Server is running");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
