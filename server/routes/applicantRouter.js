const express = require('express');
const router = express.Router();
const applicantController = require('../controllers/applicantController');
const {
    applicantValidation,
    validate,
} = require("../middlewares/validation");

// POST request to add a new application
router.post('/', applicantValidation, validate, applicantController.addApplicant);
router.get('/', applicantController.findApplicants);

module.exports = router;