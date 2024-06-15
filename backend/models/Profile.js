const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  image: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  subServiceId: { type: mongoose.Schema.Types.ObjectId, ref: 'SubService', required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Room' }],
  foods: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Food' }],
});

module.exports = mongoose.model('Profile', ProfileSchema);
