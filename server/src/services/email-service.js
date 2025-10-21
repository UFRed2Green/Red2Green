import { sendEmail } from "../utils/email.js";
import { randomInt } from "crypto";

export const emailService = {
    async sendEmail({ email, subject, text }) { // Not used
        await sendEmail({ to: email, subject, text, });
    },

    async sendForgotPasswordEmail({ email }) {
        console.log(email);
        const code = randomInt(0, 1_000_000).toString().padStart(6, "0");
        const subject = `Forgot your Red2Green Account password?`;
        const text = `Hi,\n\nWe just received a request to reset the password for your Red2Green Account.\nIf you did not make this request, you can ignore this notification.
            \nHere is the code to reset your account: ${code}\n\nBest regards,\n\nThe UFRed2Green Team`;

        await sendEmail({ to: email, subject, text });
    }
};
