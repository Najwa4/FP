const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");

// User must be authenticated
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Read JWT from the 'jwt' cookie
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.userId).select("-password");
      console.log(req.user);

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
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
