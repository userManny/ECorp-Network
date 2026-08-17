const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

require("dotenv").config();

const cors = require("cors");
const express = require("express");

const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

const {
  authenticateToken,
  requireAdmin,
} = require("./middleware/authMiddleware");

const app = express();


// Middleware
app.use(cors());
app.use(express.json());


// Port
const PORT = process.env.PORT || 5000;


// Connect to MongoDB
connectDB();


// User routes
app.use("/api/users", userRoutes);


// Authentication routes
app.use("/api/auth", authRoutes);


// Protected admin test route
app.get(
  "/api/admin-test",
  authenticateToken,
  requireAdmin,
  (req, res) => {
    res.json({
      success: true,
      message: "Admin access granted",
    });
  }
);


// Test route
app.get("/api", (req, res) => {
  res.json({
    success: true,
    message: "ECorp backend is running",
  });
});


// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`ECorp backend running on port ${PORT}`);
});