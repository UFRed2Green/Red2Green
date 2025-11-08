import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../prisma-client.js";

export async function registerUser({ firstName, lastName, email, password }) {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
        const err = new Error("Email already registered");
        err.status = 409;
        throw err;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: {
            firstName,
            lastName,
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

export async function changeUserPassword({ userId, currentPassword, newPassword }) {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    const isPasswordValid = bcrypt.compareSync(currentPassword, user.password);
    if (!isPasswordValid) {
        const err = new Error("Current password is incorrect");
        err.status = 401;
        throw err;
    }

    const isSamePassword = bcrypt.compareSync(newPassword, user.password);
    if (isSamePassword) {
        const err = new Error("New password cannot be the same as current password");
        err.status = 400;
        throw err;
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
        where: { id: userId },
        data: { password: hashedPassword },
    });

    return { message: "Password changed successfully" };
}
