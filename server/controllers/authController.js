const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const sendEmail = require("../utils/sendEmail");
const nodemailer = require("nodemailer");
require("dotenv").config();

//Login user
exports.login = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (user) {
    const isMatch = await user.matchPassword(password);
    if (isMatch) {
      const token = generateToken(res, user._id);

      res.json({
        success: true,
        data: {
          _id: user._id,
          fullName: user.fullName,
          username: user.username,
          phoneNumber: user.phoneNumber,
          role: user.role,
        },
        token,
      });
    } else {
      res.status(401).json({ error: "Invalid username or password" });
    }
  } else {
    res.status(401).json({ error: "Invalid username or password" });
  }
});

// Logout user and clear cookie
exports.logout = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out Successfully." });
});

// Initiate forgot password process
exports.forgotPassword = asyncHandler(async (req, res) => {
  const { username, emailAddress } = req.body;

  // Validate username and email
  if (!username || !emailAddress) {
    return res.status(400).json({ message: "Username and email are required" });
  }

  // Check if the provided username and email match with the user in the database
  const user = await User.findOne({ username, emailAddress });

  if (!user) {
    return res.status(404).json({ message: "Invalid username or email" });
  }

  // Function to generate a random OTP
  function generateOTP() {
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp.toString();
  }

  // Generate and store an OTP for the user
  const otp = generateOTP();
  req.session.otp = otp;

  // Function to send an OTP email to the user
  sendEmail({
    email: user.emailAddress,
    subject: "OTP for Password Reset",
    text: `Your OTP is: ${otp}`,
  });
  res.status(200).json({ message: "OTP sent successfully" });
});

// Verifies the OTP provided by the user
exports.verifyOTP = asyncHandler(async (req, res) => {
  const { otp } = req.body;
  const storedOTP = req.session.otp;
  const otpExpiryTime = req.session.otpExpiryTime;

  // Check if OTP is expired
  const currentTime = new Date();
  if (otpExpiryTime && currentTime > otpExpiryTime) {
    res.status(400).json({ error: "OTP has expired" });
    return;
  }

  // Verify OTP
  const isValid = verifyOTP(otp, storedOTP);
  if (isValid) {
    // Clear OTP and OTP expiry time from session
    delete req.session.otp;
    delete req.session.otpExpiryTime;
    res.status(200).json({ message: "OTP verified successfully" });
  } else {
    res.status(400).json({ error: "Invalid OTP" });
  }
});

// Function to verify the OTP
function verifyOTP(userOTP, storedOTP) {
  return userOTP === storedOTP;
}

// Reset user's password
exports.resetPassword = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // Find the user by ID
  const user = await User.findById(userId);
  user.password = req.body.password;
  await user.save();
  res.status(200).json({ message: "Password reset successfully" });
});

// Update user's password
exports.updatePassword = asyncHandler(async (req, res, next) => {
  const { newPassword } = req.body;
  const userId = req.user._id;

  // Find the user by ID
  const user = await User.findById(userId);
  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  const currentPassword = req.body.currentPassword;

  // Compare the current password with the stored hashed password
  const isMatch = await user.matchPassword(currentPassword);
  if (!isMatch) {
    res.status(400).json({ error: "Current password is incorrect" });
    return;
  }

  // Update the password
  user.password = newPassword;
  await user.save();

  res.status(200).json({ message: "Password updated successfully" });
});
