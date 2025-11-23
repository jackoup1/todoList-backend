import jwt from "jsonwebtoken";

// Use JWT_SECRET from env
const JWT_SECRET = process.env.JWT_SECRET || "Abbasa";

export function authMiddleware(req, res, next) {
  // Token can come from cookies or Authorization header
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    console.log("trying to acces without token");
    return res.status(401).json({ success: false, message: "Authentication required" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // store user info in req.user
    next();
  } catch (err) {
    console.error("JWT verification error:", err);
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
}

export default authMiddleware;
