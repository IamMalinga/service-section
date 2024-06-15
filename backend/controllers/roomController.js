const Profile = require('../models/Profile');
const Room = require('../models/Room');

exports.addRoom = async (req, res) => {
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
