import { success, error } from "../utils/response.js";
import prisma from "../prisma-client.js";
import bcrypt from "bcrypt";

export const forgotPasswordController = {
    async changePassword(req, res) {
        try {
            const { email, code, newPassword } = req.body;
            if (!email || !code || !newPassword) {
                return error(res, "Email, code, and new password are required", 400);
            }

            const user = await prisma.user.findUnique({ where: { email } });
            if (!user) {
                return error(res, "User not found", 404);
            }

            const reset = await prisma.forgotPassword.findFirst({
                where: {
                    userId: user.id,
                    code,
                    expiresAt: { gte: new Date() },
                },
                orderBy: { createdAt: "desc" },
            });

            if (!reset) {
                return error(res, "Invalid or expired code", 400);
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await prisma.user.update({
                where: { id: user.id },
                data: { password: hashedPassword },
            });

            await prisma.forgotPassword.delete({ where: { id: reset.id } });

            return success(res, "Password updated successfully");
        } catch (err) {
            console.error(err);
            return error(res, "Server error", 500);
        }
    },
};
