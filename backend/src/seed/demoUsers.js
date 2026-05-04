const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const connectDB = require("../config/db");
const User = require("../models/User");

dotenv.config();

const demoUsers = [
  { name: "Ram Bahadur Thapa", email: "buyer@hariyo.np", phone: "9800000001", role: "buyer" },
  { name: "Ilam Tea Estate", email: "seller@hariyo.np", phone: "9800000002", role: "seller", status: "approved" },
  { name: "Delivery Postman", email: "delivery@hariyo.np", phone: "9800000003", role: "delivery" },
  { name: "Admin User", email: "admin@hariyo.np", phone: "9800000004", role: "admin" },
];

const seed = async () => {
  await connectDB();
  const passwordHash = await bcrypt.hash("password", 12);
  const mpinHash = await bcrypt.hash("1234", 12);

  for (const user of demoUsers) {
    await User.findOneAndUpdate(
      { email: user.email },
      {
        ...user,
        status: user.status || "active",
        passwordHash,
        mpinHash,
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
  }

  console.log("Demo users seeded. Password: password, MPIN: 1234");
  process.exit(0);
};

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
