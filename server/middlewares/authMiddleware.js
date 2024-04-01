const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");

// User must be authenticated
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check for Authorization header and extract token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.userId).select("-password");

      next();
    } catch (error) {
      throw new Error("Not authorized, token failed");
    }
  } else {
    throw new Error("Not authorized, no token");
  }
});

// Check if the user has a specific role
const checkRole = (role) => (req, res, next) => {
  if (req.user && req.user.role === role) {
    next();
  } else {
    res.status(401);
    throw new Error(`Not authorized as ${role}`);
  }
};

// Usage examples
const admin = checkRole("admin");
const employee = checkRole("employee");
const hrManager = checkRole("hr_manager");
const hrStaff = checkRole("hr_staff");
const college = checkRole("college");
const department = checkRole("department");

module.exports = {
  protect,
  admin,
  employee,
  hrManager,
  hrStaff,
  college,
  department,
};
