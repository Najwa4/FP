const express = require("express");
const router = express.Router();
const EmployeeRestRequestController = require("../controllers/restController");
const { protect } = require("../middlewares/authMiddleware");
const {
  resetPasswordValidation,
  validate,
} = require("../middlewares/validation");

router.post(
  "/:employeeId",
  //   resetPasswordValidation,
  //   validate,
  EmployeeRestRequestController.createRequest
);
router.put(
  "/college/:requestId",
  protect,
  //   resetPasswordValidation,
  //   validate,
  EmployeeRestRequestController.acceptOrRejectByCollege
);
// router.put("/:requestId/pass-to-hr", EmployeeRestRequestController.passToHR);
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

module.exports = router;
