import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
import BlacklistToken from "../models/Token.model.js";

const authMiddleware = async (req, res, next) => {
  try {
    // ✅ Properly read token from cookies
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    // ✅ Check blacklist (logout support)
    const blacklisted = await BlacklistToken.findOne({ token });
    if (blacklisted) {
      return res.status(401).json({ message: "Session expired. Please login again." });
    }

    // ✅ Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded?.id) {
      return res.status(401).json({ message: "Invalid token payload" });
    }

    // ✅ Fetch user
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // ✅ Attach user to request
    req.user = user;

    next();
  } catch (err) {
    console.error("Auth Middleware Error:", err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default authMiddleware;