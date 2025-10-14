import { registerUser, loginUser } from "../services/auth-service.js";
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
