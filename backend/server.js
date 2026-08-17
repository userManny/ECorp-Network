const cors = require("cors");
require("dotenv").config();

const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(cors());

const PORT = 5000;


// Connect to MongoDB
connectDB();


// Middleware
app.use(express.json());

// User routes
app.use("/api/users", userRoutes);


// Test route
app.get("/api", (req, res) => {
  res.json({
    success: true,
    message: "ECorp backend is running"
  });
});


app.listen(PORT, () => {
  console.log(`ECorp backend running on port ${PORT}`);
});