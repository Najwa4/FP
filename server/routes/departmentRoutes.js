const express = require("express");
const departmentController = require("../controllers/departmentController");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const {
  resetPasswordValidation,
  validate,
} = require("../middlewares/validation");

// Add Department
router.post(
  "/",
  protect,
//   resetPasswordValidation,
//   validate,
  departmentController.addDepartment
);

module.exports = router;
