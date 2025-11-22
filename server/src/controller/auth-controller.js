import { registerUser, loginUser, changeUserPassword, getUserEmail } from "../services/auth-service.js";
import { success, error } from "../utils/response.js";

export async function registerController(req, res) {
    try {
        const result = await registerUser(req.body);
        return success(res, result, "User registered successfully", 201);
    } catch (err) {
        console.error(err);
        return error(res, "REGISTER_FAILED", err.message, err.status || 500);
    }
}

export async function loginController(req, res) {
    try {
        const result = await loginUser(req.body);
        return success(res, result, "Login successful", 200);
    } catch (err) {
        console.error(err);
        return error(res, "LOGIN_FAILED", err.message, err.status || 500);
    }
}

export async function changePasswordController(req, res) {
    try {
        const { email, currentPassword, newPassword, confirmPassword } = req.body;
        const result = await changeUserPassword({
            email,
            currentPassword,
            newPassword,
            confirmPassword,
        });
        return success(res, result, "Password changed successfully", 200);
    } catch (err) {
        console.error(err);
        return error(res, "PASSWORD_CHANGE_FAILED", err.message, err.status || 500);
    }
}

export async function getUserEmailController(req, res) {
    try {
        const { token } = req.body;
        const result = await getUserEmail({ token });
        return success(res, result, "Fetched email successfully", 200);
    } catch (err) {
        console.error(err);
        return error(res, "Email fetch failed", err.message, err.status || 500);
    }
}
