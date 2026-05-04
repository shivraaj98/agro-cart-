const express = require("express");
const { body, validationResult } = require("express-validator");
const Product = require("../models/Product");
const { requireAuth, requireRole } = require("../middleware/auth");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const filter = req.query.category ? { category: req.query.category } : {};
    const products = await Product.find(filter).populate("seller", "name phone").sort("-createdAt");
    res.json({ products });
  } catch (err) {
    next(err);
  }
});

router.post(
  "/",
  requireAuth,
  requireRole("seller", "admin"),
  [
    body("name").trim().isLength({ min: 2 }),
    body("category").trim().notEmpty(),
    body("price").isFloat({ min: 0 }),
    body("stock").isInt({ min: 0 }),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ message: "Validation failed", errors: errors.array() });

    try {
      const product = await Product.create({ ...req.body, seller: req.user._id });
      res.status(201).json({ product });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
