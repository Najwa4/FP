const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");
const { protect } = require("../middlewares/authMiddleware");
const {
  resetPasswordValidation,
  validate,
} = require("../middlewares/validation");

router.get("/", protect, employeeController.findEmployees);
router.put(
  "/updateDaysOfAbsence/:employeeId",
  protect,
  // resetPasswordValidation,
  // validate,
  employeeController.updateDaysOfAbsence
);

module.exports = router;
