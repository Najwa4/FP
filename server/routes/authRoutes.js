const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {
  resetPasswordValidation,
  validate,
} = require("../middlewares/validation");
const {
  login,
  logout,
  forgotPassword,
  verifyOTP,
  updatePassword,
  resetPassword,
} = require("../controllers/authController");
const router = express.Router();

router.post("/login", login);
router.post("/logout", protect, logout);
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOTP);
router.put("/change-password", protect, updatePassword);
router.put(
  "/reset-password",
  protect,
  // resetPasswordValidation,
  // validate,
  resetPassword
);

module.exports = router;
