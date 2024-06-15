const User = require('../models/User');
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;

// Register user
exports.register = async (req, res) => {
  const { username, password } = req.body;
  const user = new User({ username, password });
  await user.save();
  res.status(201).send('User created');
};

// Login user
exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).send('Invalid credentials');
  const isMatch = await user.comparePassword(password);
  if (!isMatch) return res.status(400).send('Invalid credentials');
  const token = jwt.sign({ id: user._id }, SECRET);
  res.json({ token });
};
