const SubService = require('../models/SubService');

exports.getSubServicesByServiceId = async (req, res) => {
  try {
    const subServices = await SubService.find({ serviceId: req.params.serviceId });
    res.json(subServices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProfilesBySubServiceId = async (req, res) => {
  try {
    const subService = await SubService.findById(req.params.subServiceId).populate('profiles');
    if (!subService) return res.status(404).json({ message: 'SubService not found' });
    res.json(subService.profiles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
