const express = require('express');
const router = express.Router();
const subServiceController = require('../controllers/subServiceController');

router.get('/:serviceId', subServiceController.getSubServicesByServiceId);
router.get('/:subServiceId/profiles', subServiceController.getProfilesBySubServiceId);

module.exports = router;
