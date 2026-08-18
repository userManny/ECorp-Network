const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);


require("dotenv").config();

const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("./models/User");
const connectDB = require("./config/db");

async function createAdmin() {
  try {
    await connectDB();

    const existingAdmin = await User.findOne({
      email: "admin@ecorp.com",
    });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash(
      "admin123",
      10
    );

    const admin = new User({
      name: "ECorp Admin",
      email: "admin@ecorp.com",
      password: hashedPassword,
      phone: "9999999999",
      plan: "Pro",
      bill: 3500,
      paid: true,
      role: "admin",
    });

    await admin.save();

    console.log("Admin account created successfully");

    process.exit();

  } catch (error) {
    console.error("Failed to create admin:", error);
    process.exit(1);
  }
}

createAdmin();