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

export async function changeUserPassword({ email, currentPassword, newPassword, confirmPassword }) {
    if (newPassword !== confirmPassword) {
        const err = new Error("New password and confirm password do not match");
        err.status = 400;
        throw err;
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        const err = new Error("User not found");
        err.status = 404;
        throw err;
    }

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
        where: { id: user.id },
        data: { password: hashedPassword },
    });

    return { message: "Password changed successfully" };
}

export async function getUserEmail({ token }) {
    const id = jwt.verify(token, process.env.JWT_SECRET).id;
    
    const user = await prisma.user.findUnique({
        where: { id: id },
        select: { email: true },
    });

    if (!user) {
        const err = new Error("User not found");
        err.status = 404;
        throw err;
    }

    return user.email;
}
