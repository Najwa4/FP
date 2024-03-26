const express = require("express");
const collegeController = require("../controllers/collegeController");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const {
  resetPasswordValidation,
  validate,
} = require("../middlewares/validation");

router.post(
  "/",
  protect,
  //   resetPasswordValidation,
  //   validate,
  collegeController.addCollege
);

module.exports = router;
