const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  availability: { type: Number, required: true },
  images: { type: [String], required: true }
});

module.exports = mongoose.model('Room', RoomSchema);
