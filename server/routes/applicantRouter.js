const express = require("express");
const router = express.Router();
const applicantController = require("../controllers/applicantController");
const { protect } = require("../middlewares/authMiddleware");
const {
  resetPasswordValidation,
  validate,
} = require("../middlewares/validation");

router.get("/", protect, applicantController.findApplicants);
router.post(
  "/:announcementId",
  //   resetPasswordValidation,
  //   validate,
  applicantController.addApplicant
);
router.put(
  "/:announcementId/:id",
  protect,
  applicantController.updateApplicantStatus
);

module.exports = router;
