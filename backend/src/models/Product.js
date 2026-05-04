const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0 },
    unit: { type: String, default: "kg" },
    description: String,
    district: String,
    images: [String],
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0 },
    status: { type: String, enum: ["active", "inactive", "out_of_stock"], default: "active" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
