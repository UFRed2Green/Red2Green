import express from "express";
import authRoutes from "./routes/auth-routes.js";

const app = express();
const PORT = process.env.PORT ?? 5000;

// Middleware
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.get("/", (req, res) => {
    res.send("Server is running");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
