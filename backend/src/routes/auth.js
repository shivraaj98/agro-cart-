const express = require("express");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const signToken = require("../utils/token");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

const sendValidation = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ message: "Validation failed", errors: errors.array() });
    return true;
  }
  return false;
};

router.post(
  "/register",
  [
    body("name").trim().isLength({ min: 2 }),
    body("email").isEmail().normalizeEmail(),
    body("phone").matches(/^(97|98)\d{8}$/),
    body("password").isLength({ min: 6 }),
    body("mpin").matches(/^\d{4,6}$/),
    body("role").optional().isIn(["buyer", "seller", "delivery", "admin"]),
  ],
  async (req, res, next) => {
    if (sendValidation(req, res)) return;
    try {
      const { name, email, phone, password, mpin, role = "buyer", address } = req.body;
      const exists = await User.findOne({ $or: [{ email }, { phone }] });
      if (exists) return res.status(409).json({ message: "Email or phone already registered" });

      const user = await User.create({
        name,
        email,
        phone,
        role,
        address,
        status: role === "seller" ? "pending_approval" : "active",
        passwordHash: await bcrypt.hash(password, 12),
        mpinHash: await bcrypt.hash(mpin, 12),
      });

      res.status(201).json({ token: signToken(user), user: user.toSafeJSON() });
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/login",
  [body("email").isEmail().normalizeEmail(), body("password").notEmpty()],
  async (req, res, next) => {
    if (sendValidation(req, res)) return;
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user || !(await user.comparePassword(req.body.password))) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      res.json({ token: signToken(user), user: user.toSafeJSON() });
    } catch (err) {
      next(err);
    }
  }
);

router.get("/me", requireAuth, (req, res) => {
  res.json({ user: req.user.toSafeJSON() });
});

module.exports = router;
