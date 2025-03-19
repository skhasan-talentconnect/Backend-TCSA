import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization"); // Get token from request headers

    if (!token) {
        return res.status(401).json({ message: "Access Denied. No Token Provided!" });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY); // Verify token
        req.user = decoded; // Attach user info to request object
        next(); // Proceed to next middleware
    } catch (error) {
        res.status(400).json({ message: "Invalid Token" });
    }
};

export default authMiddleware;