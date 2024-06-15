// controllers/hotelProfileController.js

const Profile = require('../models/Profile');

exports.createProfile = async (req, res) => {
  // Your implementation
};

exports.getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find({ createdBy: req.user.id })
      .populate({
        path: 'subServiceId',
        populate: {
          path: 'serviceId',
          model: 'Service',
          select: 'name'
        }
      });

    res.json(profiles);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getProfileById = async (req, res) => {
  // Your implementation
};
