const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const profileController = require('../controllers/profileController')
const hotelProfiles = require('./profiles/hotelProfiles');
const carAndBikeRentalProfiles = require('./profiles/carAndBikeRentalProfiles');

// Main profile routes
router.get('/', auth, profileController.getAllProfiles);

router.use('/hotels', hotelProfiles);
router.use('/car-and-bike-rentals', carAndBikeRentalProfiles);

module.exports = router;
