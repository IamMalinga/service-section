const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');
const auth = require('../middleware/auth');

// Create a new profile
router.post('/api/profiles', auth, async (req, res) => {
  const { subServiceId, name, description, address, phone, email, image } = req.body;
  const profile = new Profile({ subServiceId, name, description, address, phone, email, image });
  await profile.save();
  res.status(201).json(profile);
});

// Get profiles for a subservice
router.get('/api/subservices/:subServiceId/profiles', async (req, res) => {
  const profiles = await Profile.find({ subServiceId: req.params.subServiceId });
  res.json(profiles);
});

module.exports = router;
