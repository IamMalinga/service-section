const Profile = require('../models/Profile');
const Food = require('../models/Food');

exports.addFood = async (req, res) => {
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
