import jwt from "jsonwebtoken";

/**
 * Middleware executes between the time a request is received
 * and the time a response is sent.
 *
 * This middleware protects routes by verifying that each request
 * includes a valid JSON Web Token (JWT). If verification succeeds,
 * the decoded user ID is attached to the request; otherwise, a 401
 * Unauthorized response is returned. The `next()` function passes
 * control to the next middleware or route (endpoint) handler.
 */
function authMiddleware(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: "No token provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: "Invalid token" });
        }
        req.userId = decoded.id;
        next();
    });
}

export default authMiddleware;
