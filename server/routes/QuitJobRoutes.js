const express = require('express');
const router = express.Router();
const QuitJobController = require('../controllers/quitjobControlle');

router.post('/', QuitJobController.createRequest);
router.put('/:requestId/accept', QuitJobController.acceptRequest);
router.put('/:requestId/reject', QuitJobController.rejectRequest);

module.exports = router;