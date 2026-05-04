const jwt = require("jsonwebtoken");
const User = require("../models/User");

const requireAuth = async (req, res, next) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) return res.status(401).json({ message: "Authentication required" });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || "dev-secret");
    const user = await User.findById(payload.sub);
    if (!user) return res.status(401).json({ message: "Invalid token" });
    if (user.status === "suspended") return res.status(403).json({ message: "Account suspended" });
    req.user = user;
    next();
  } catch (_err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

const requireRole = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: "Insufficient permission" });
  }
  next();
};

module.exports = { requireAuth, requireRole };
