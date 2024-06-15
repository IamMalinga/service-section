const mongoose = require('mongoose');

const SubServiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  profiles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Profile' }],
});

module.exports = mongoose.model('SubService', SubServiceSchema);
