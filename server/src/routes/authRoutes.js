const express = require("express");
const router = express.Router();

const { signup, signin, changePassword, forgotPassword } = require("../controllers/authController");
const { verifyToken } = require("../middleware/authmiddleware");

router.post("/signup", async (req, res) => {
  try {
    await signup(req, res); // safely call controller
  } catch (error) {
    console.error("❌ Route error:", error.message);
    res.status(500).json({ message: "Something went wrong in signup route" });
  }
});

router.post("/signin", async (req, res) => {
  try {
    await signin(req, res); // safely call signin controller
  } catch (error) {
    console.error("❌ Route error:", error.message);
    res.status(500).json({ message: "Something went wrong in signin route" });
  }
});

router.post("/change-password", verifyToken, async (req, res) => {
  try {
    await changePassword(req, res);
  } catch (error) {
    console.error("❌ Route error:", error.message);
    res.status(500).json({ message: "Something went wrong in change-password route" });
  }
});

router.post("/forgot-password", async (req, res) => {
  try {
    await forgotPassword(req, res);
  } catch (error) {
    console.error("❌ Route error:", error.message);
    res.status(500).json({ message: "Something went wrong in forgot-password route" });
  }
});

module.exports = router;
