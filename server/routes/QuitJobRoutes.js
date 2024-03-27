const express = require("express");
const router = express.Router();
const QuitJobController = require("../controllers/quitjobControlle");
const { protect } = require("../middlewares/authMiddleware");
const {
  resetPasswordValidation,
  validate,
} = require("../middlewares/validation");

router.post(
  "/create/:employeeId",
  protect,
  //   resetPasswordValidation,
  //   validate,
  QuitJobController.createRequest
);
router.put("/status/:requestId", protect, QuitJobController.updateStatus);

module.exports = router;
