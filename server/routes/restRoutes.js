const express = require("express");
const router = express.Router();
const EmployeeRestRequestController = require("../controllers/restController");
const { protect } = require("../middlewares/authMiddleware");

router.post(
  "/:employeeId",
  protect,
  EmployeeRestRequestController.createRequest
);
router.put(
  "/college/:requestId",
  protect,
  EmployeeRestRequestController.acceptOrRejectByCollege
);
router.put(
  "/hr/:requestId",
  protect,
  EmployeeRestRequestController.acceptOrRejectByHr
);
router.get(
  "/accepted-college-requests",
  protect,
  EmployeeRestRequestController.getAcceptedCollegeRequests
);
router.get(
  "/approved-rest-requests",
  protect,
  EmployeeRestRequestController.getApprovedRestRequests
);
router.get("/all", protect, EmployeeRestRequestController.findAllRestRequests);

module.exports = router;
