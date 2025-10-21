import { emailService } from "../services/email-service.js";
import { success, error } from "../utils/response.js";

export const emailController = {
    async send(req, res) {
        try {
            const { email, subject, text, type } = req.body;

            if (!email) {
                return error(res, "Email is required.", 400);
            }

            switch (type) {
                case "email":
                    await emailService.sendEmail(email, subject, text);
                    break;
                case "forgotPassword":
                    await emailService.sendForgotPasswordEmail({ email });
                    break;
                default:
                    return error(res, "Invalid email type.", 400);
            }

            return success(res, "Email sent successfully!");
        } catch (err) {
            console.error("Email error:", err);
            return error(res, "Failed to send email", 500);
        }
    }
};
