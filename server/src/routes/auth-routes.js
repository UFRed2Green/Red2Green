import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    try {
        const user = await prisma.user.create({
            data: {
                first_name,
                last_name,
                email,
                password: hashedPassword,
            },
        });
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "24h",
        });
        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.user.findUnique({
            where: { email: email },
        });

        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const isValidPassword = bcrypt.compareSync(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "24h",
        });
        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }
});

export default router;
