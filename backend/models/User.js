const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    plan: {
      type: String,
      required: true,
      enum: ["Basic", "Premium", "Pro"],
    },

    bill: {
      type: Number,
      required: true,
    },

    paid: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);