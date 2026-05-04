const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    name: { type: String, required: true },
    seller: String,
    qty: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 0 },
  },
  { _id: false }
);

const deliveryAddressSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    district: { type: String, required: true },
    street: { type: String, required: true },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    orderNo: { type: String, unique: true, index: true },
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [orderItemSchema],
    deliveryAddress: deliveryAddressSchema,
    subtotal: { type: Number, required: true, min: 0 },
    vat: { type: Number, default: 0, min: 0 },
    logistics: { type: Number, default: 0, min: 0 },
    total: { type: Number, required: true, min: 0 },
    paymentMethod: {
      type: String,
      enum: ["esewa", "khalti", "ime", "mobile", "cod", "stripe"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending_verification", "verified", "failed", "cod_pending"],
      default: "pending_verification",
    },
    status: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

orderSchema.pre("save", function assignOrderNo(next) {
  if (!this.orderNo) this.orderNo = `HB-${Date.now().toString().slice(-6)}`;
  next();
});

module.exports = mongoose.model("Order", orderSchema);
