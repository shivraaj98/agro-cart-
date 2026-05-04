const express = require("express");
const { body, validationResult } = require("express-validator");
const Order = require("../models/Order");
const { requireAuth, requireRole } = require("../middleware/auth");

const router = express.Router();

router.get("/", requireAuth, async (req, res, next) => {
  try {
    const filter = req.user.role === "admin" || req.user.role === "delivery" ? {} : { buyer: req.user._id };
    const orders = await Order.find(filter).sort("-createdAt");
    res.json({ orders });
  } catch (err) {
    next(err);
  }
});

router.post(
  "/",
  requireAuth,
  [
    body("items").isArray({ min: 1 }),
    body("deliveryAddress.name").trim().notEmpty(),
    body("deliveryAddress.phone").matches(/^(97|98)\d{8}$/),
    body("deliveryAddress.district").trim().notEmpty(),
    body("deliveryAddress.street").trim().notEmpty(),
    body("paymentMethod").isIn(["esewa", "khalti", "ime", "mobile", "cod", "stripe"]),
    body("paymentVerified").isBoolean(),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ message: "Validation failed", errors: errors.array() });
    if (!req.body.paymentVerified) return res.status(402).json({ message: "Payment must be verified first" });

    try {
      const subtotal = req.body.items.reduce((sum, item) => sum + Number(item.price) * Number(item.qty), 0);
      const vat = Number(req.body.vat || 0);
      const logistics = Number(req.body.logistics || 0);
      const order = await Order.create({
        buyer: req.user._id,
        items: req.body.items,
        deliveryAddress: req.body.deliveryAddress,
        subtotal,
        vat,
        logistics,
        total: Number(req.body.total || subtotal + vat + logistics),
        paymentMethod: req.body.paymentMethod,
        paymentStatus: req.body.paymentMethod === "cod" ? "cod_pending" : "verified",
      });
      res.status(201).json({ order });
    } catch (err) {
      next(err);
    }
  }
);

router.patch(
  "/:id/status",
  requireAuth,
  requireRole("admin", "delivery"),
  [body("status").isIn(["Pending", "Processing", "Shipped", "Delivered", "Cancelled"])],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ message: "Validation failed", errors: errors.array() });

    try {
      const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
      if (!order) return res.status(404).json({ message: "Order not found" });
      res.json({ order });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
