const Profile = require('../models/Profile');

// Define the controller methods
const createProfile = async (req, res) => {
  const { name, description, address, phone, email, latitude, longitude, subServiceId } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;
  const profile = new Profile({
    name,
    description,
    address,
    phone,
    email,
    image,
    latitude,
    longitude,
    subServiceId,
    createdBy: req.user.id
  });
  try {
    const newProfile = await profile.save();
    res.status(201).json(newProfile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find({ createdBy: req.user.id }).populate('subServiceId');
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getProfileById = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id).populate('subServiceId');
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add other methods as necessary

module.exports = {
  createProfile,
  getAllProfiles,
  getProfileById,
  // Export additional methods as needed
};
