import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../prisma-client.js";

export async function registerUser({ first_name, last_name, email, password }) {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
        const err = new Error("Email already registered");
        err.status = 409;
        throw err;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
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
    return { token, user: { id: user.id, email: user.email } };
}

export async function loginUser({ email, password }) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        const err = new Error("Invalid email or password");
        err.status = 401;
        throw err;
    }

    const valid = bcrypt.compareSync(password, user.password);
    if (!valid) {
        const err = new Error("Invalid email or password");
        err.status = 401;
        throw err;
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "24h",
    });
    return { token, user: { id: user.id, email: user.email } };
}
