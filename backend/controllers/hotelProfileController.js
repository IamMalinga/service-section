const Profile = require('../models/Profile');
const Room = require('../models/Room');
const Food = require('../models/Food');

// Create a profile for a hotel
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

// Get all profiles for the authenticated user
const getAllProfiles = async (req, res) => {
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

// Get a specific profile by ID
const getProfileById = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id)
      .populate('rooms')
      .populate('foods');
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add Room to Profile
const addRoom = async (req, res) => {
  try {
    const { name, price, description, availability } = req.body;
    const images = req.files.map(file => `/uploads/${file.filename}`);
    const profile = await Profile.findById(req.params.id);
    if (!profile) return res.status(404).json({ message: 'Profile not found' });

    const room = new Room({ name, price, description, availability, images });
    await room.save();
    profile.rooms.push(room._id);
    await profile.save();

    res.status(201).json(profile);
  } catch (error) {
    console.error('Error adding room:', error);
    res.status(500).json({ message: error.message });
  }
};

// Add Food to Profile
const addFood = async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;
    const profile = await Profile.findById(req.params.id);
    if (!profile) return res.status(404).json({ message: 'Profile not found' });

    const food = new Food({ name, price, description, image });
    await food.save();
    profile.foods.push(food._id);
    await profile.save();

    res.status(201).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProfile,
  getAllProfiles,
  getProfileById,
  addRoom,
  addFood,
};
