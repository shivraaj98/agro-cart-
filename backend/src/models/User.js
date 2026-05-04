const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const addressSchema = new mongoose.Schema(
  {
    district: String,
    street: String,
    ward: String,
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [/^(97|98)\d{8}$/, "Use a valid Nepali mobile number"],
    },
    passwordHash: { type: String, required: true },
    mpinHash: { type: String, required: true },
    role: {
      type: String,
      enum: ["buyer", "seller", "delivery", "admin"],
      default: "buyer",
    },
    status: {
      type: String,
      enum: ["active", "pending_approval", "approved", "suspended"],
      default: "active",
    },
    address: addressSchema,
  },
  { timestamps: true }
);

userSchema.methods.comparePassword = function comparePassword(password) {
  return bcrypt.compare(password, this.passwordHash);
};

userSchema.methods.compareMpin = function compareMpin(mpin) {
  return bcrypt.compare(mpin, this.mpinHash);
};

userSchema.methods.toSafeJSON = function toSafeJSON() {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    phone: this.phone,
    role: this.role,
    status: this.status,
    address: this.address,
  };
};

module.exports = mongoose.model("User", userSchema);
