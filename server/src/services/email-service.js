import prisma from "../prisma-client.js";
import { sendEmail } from "../utils/email.js";
import { randomInt } from "crypto";

export const emailService = {
    async sendEmail({ email, subject, text }) { // Not used
        await sendEmail({ to: email, subject, text, });
    },

    async sendForgotPasswordEmail({ email }) {
        const code = randomInt(0, 1_000_000).toString().padStart(6, "0");

        const user = await prisma.user.findUnique({ where: { email }});
        if (!user) {
            throw new Error("User not found");
        }

        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // One day
        await prisma.forgotPassword.create({
            data: {
                userId: user.id,
                code,
                expiresAt
            }
        });

        const subject = `Forgot your Red2Green Account password?`;
        const text = `Hi,\n\nWe just received a request to reset the password for your Red2Green Account.\nIf you did not make this request, you can ignore this notification.
            \nHere is the code to reset your account: ${code}\nExpires in 1 day.\n\nBest regards,\n\nThe UFRed2Green Team`;

        await sendEmail({ to: email, subject, text });
    }
};
