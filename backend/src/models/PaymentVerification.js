const mongoose = require("mongoose");

const paymentVerificationSchema = new mongoose.Schema(
  {
    order: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    phone: { type: String, required: true },
    method: { type: String, required: true },
    verified: { type: Boolean, default: false },
    failureReason: String,
    verifiedAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("PaymentVerification", paymentVerificationSchema);
