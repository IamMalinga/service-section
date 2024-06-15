const jwt = require('jsonwebtoken');
const User = require('../models/User');
const SECRET = process.env.JWT_SECRET;

const auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).send('Unauthorized');
  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    const user = await User.findById(decoded.id);
    if (!user) throw new Error();
    next();
  } catch (err) {
    res.status(401).send('Unauthorized');
  }
};

module.exports = auth;
