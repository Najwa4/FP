const express = require("express");
const router = express.Router();
const {
  getAllAnnouncements,
  createEmployeeRequest,
  acceptRejectAnnouncement,
  getAcceptedAnnouncements,
  getRejectedAnnouncements,
  findAnnouncement,
  updateAnnouncement,
  updateTestDay,
} = require("../controllers/announceController");
const { protect } = require("../middlewares/authMiddleware");
const {
  resetPasswordValidation,
  validate,
} = require("../middlewares/validation");

router.get("/", getAllAnnouncements);
router.post(
  "/employee-request",
  protect,
  //   resetPasswordValidation,
  //   validate,
  createEmployeeRequest
);
router.get("/accepted", protect, getAcceptedAnnouncements);
router.get("/rejected", protect, getRejectedAnnouncements);
router.get("/find", protect, findAnnouncement);
router.put("/update-announcement/:announcementId", protect, updateAnnouncement);
router.put("/Test-Day/:announcementId", protect, updateTestDay);
router.post(
  "/accept-reject/:announcementId",
  protect,
  acceptRejectAnnouncement
);

module.exports = router;
