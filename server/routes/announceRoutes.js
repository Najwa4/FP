const express = require("express");
const router = express.Router();
const {
  getAllAnnouncements,
  createEmployeeRequest,
  getAcceptedAnnouncements,
  getRejectedAnnouncements,
  findAnnouncement,
  updateAnnouncement
} = require("../controllers/announceController");

router.get('/', getAllAnnouncements);
router.post('/employee-request', createEmployeeRequest);
router.get('/accepted', getAcceptedAnnouncements);
router.get('/rejected', getRejectedAnnouncements);
router.put('/:announcementId', updateAnnouncement);
router.get('/:announcementId', findAnnouncement);

module.exports = router;