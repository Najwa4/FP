const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

router.post('/', employeeController.addEmployee);
router.put('/:employeeId', employeeController.updateEmployee);
router.get('/', employeeController.findEmployees);
router.get('/:employeeId', employeeController.viewProfile);
router.put('/departments/:departmentId/employees/:employeeId/days-of-absence', employeeController.updateDaysOfAbsence);

module.exports = router;