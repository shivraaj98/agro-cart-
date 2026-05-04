const express = require("express");
const { body, validationResult } = require("express-validator");
const PaymentVerification = require("../models/PaymentVerification");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

router.post(
  "/verify",
  requireAuth,
  [
    body("phone").matches(/^(97|98)\d{8}$/),
    body("password").notEmpty(),
    body("mpin").matches(/^\d{4,6}$/),
    body("method").isIn(["esewa", "khalti", "ime", "mobile", "cod", "stripe"]),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ message: "Validation failed", errors: errors.array() });

    try {
      const phoneMatches = req.body.phone === req.user.phone;
      const passwordMatches = await req.user.comparePassword(req.body.password);
      const mpinMatches = await req.user.compareMpin(req.body.mpin);
      const verified = phoneMatches && passwordMatches && mpinMatches;

      await PaymentVerification.create({
        user: req.user._id,
        order: req.body.orderId,
        phone: req.body.phone,
        method: req.body.method,
        verified,
        failureReason: verified ? undefined : "Phone, password, or MPIN did not match",
        verifiedAt: verified ? new Date() : undefined,
      });

      if (!verified) return res.status(401).json({ verified: false, message: "Payment verification failed" });
      res.json({ verified: true, message: "Payment verified" });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
