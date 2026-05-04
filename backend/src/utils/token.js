const jwt = require("jsonwebtoken");

const signToken = user =>
  jwt.sign(
    { sub: user._id, role: user.role },
    process.env.JWT_SECRET || "dev-secret",
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );

module.exports = signToken;
