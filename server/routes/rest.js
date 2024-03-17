const express = require('express');
const router = express.Router();
const EmployeeRestRequestController = require('../controllers/restController');

router.post('/', EmployeeRestRequestController.createRequest);
router.put('/:requestId/accept-college', EmployeeRestRequestController.acceptByCollege);
router.put('/:requestId/reject-college', EmployeeRestRequestController.rejectByCollege);
router.put('/:requestId/pass-to-hr', EmployeeRestRequestController.passToHR);
router.put('/:requestId/accept-hr', EmployeeRestRequestController.acceptByHR);
router.put('/:requestId/reject-hr', EmployeeRestRequestController.rejectByHR);

module.exports = router;