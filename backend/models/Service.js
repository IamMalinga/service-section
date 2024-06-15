const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subServices: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SubService' }],
});

module.exports = mongoose.model('Service', ServiceSchema);
