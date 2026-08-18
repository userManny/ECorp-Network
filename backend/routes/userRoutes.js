const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const {
  authenticateToken,
  requireAdmin,
} = require("../middleware/authMiddleware");

const router = express.Router();


// All routes require a valid login
router.use(authenticateToken);


// =========================================
// GET LOGGED-IN USER'S OWN INFORMATION
// =========================================

router.get("/me", async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select(
      "-password"
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(user);

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch user information",
    });
  }
});


// =========================================
// ADMIN ROUTES
// =========================================

// All routes below this point require admin
router.use(requireAdmin);


// =========================================
// GET ALL CUSTOMERS
// =========================================

router.get("/", async (req, res) => {
  try {

    // Only return normal customers.
    // Admin accounts are not customers.
    const users = await User.find({
      role: "user",
    }).select("-password");

    res.json(users);

  } catch (error) {
    console.error("Fetch users error:", error);

    res.status(500).json({
      message: "Failed to fetch users",
    });
  }
});


// =========================================
// CREATE NEW CUSTOMER
// =========================================

router.post("/", async (req, res) => {
  try {

    const {
      name,
      email,
      password,
      phone,
      plan,
      bill,
      paid,
    } = req.body;


    // Hash customer password
    const hashedPassword = await bcrypt.hash(
      password,
      10
    );


    // Admin can only create normal customers
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      plan,
      bill,
      paid,

      // Always create as customer
      role: "user",
    });


    const savedUser = await newUser.save();


    // Do not send password back to frontend
    const userResponse = savedUser.toObject();

    delete userResponse.password;


    res.status(201).json(userResponse);

  } catch (error) {

    console.error("Create user error:", error);

    res.status(500).json({
      message: "Failed to create user",
    });
  }
});


// =========================================
// GET SINGLE CUSTOMER
// =========================================

router.get("/:id", async (req, res) => {
  try {

    const user = await User.findOne({
      _id: req.params.id,
      role: "user",
    }).select("-password");


    if (!user) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }


    res.json(user);

  } catch (error) {

    res.status(500).json({
      message: "Failed to fetch customer",
    });
  }
});


// =========================================
// UPDATE CUSTOMER
// =========================================

router.put("/:id", async (req, res) => {
  try {

    // Prevent changing the role through the update request
    const updateData = {
      ...req.body,
      role: "user",
    };


    const updatedUser = await User.findOneAndUpdate(
      {
        _id: req.params.id,
        role: "user",
      },
      updateData,
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");


    if (!updatedUser) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }


    res.json(updatedUser);

  } catch (error) {

    console.error("Update user error:", error);

    res.status(500).json({
      message: "Failed to update customer",
    });
  }
});


// =========================================
// MARK CUSTOMER AS PAID
// =========================================

router.patch("/:id/pay", async (req, res) => {
  try {

    const updatedUser = await User.findOneAndUpdate(
      {
        _id: req.params.id,
        role: "user",
      },
      {
        paid: true,
      },
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");


    if (!updatedUser) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }


    res.json(updatedUser);

  } catch (error) {

    res.status(500).json({
      message: "Failed to mark payment",
    });
  }
});


// =========================================
// DELETE CUSTOMER
// =========================================

router.delete("/:id", async (req, res) => {
  try {

    const deletedUser = await User.findOneAndDelete({
      _id: req.params.id,
      role: "user",
    });


    if (!deletedUser) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }


    res.json({
      message: "Customer deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: "Failed to delete customer",
    });
  }
});


module.exports = router;