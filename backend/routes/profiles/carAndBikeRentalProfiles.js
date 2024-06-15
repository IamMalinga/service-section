const express = require('express');
const router = express.Router();
const carAndBikeRentalProfileController = require('../../controllers/carAndBikeRentalProfileController');
const auth = require('../../middleware/auth');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure the uploads directory exists
const uploadDir = path.join(__dirname, '../../public/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Appends timestamp to the original file name
  }
});
const upload = multer({ storage });

// Define routes
router.post('/', upload.single('image'), auth, carAndBikeRentalProfileController.createProfile);
router.get('/', auth, carAndBikeRentalProfileController.getAllProfiles);
router.get('/:id', auth, carAndBikeRentalProfileController.getProfileById);
// Add additional routes as necessary

module.exports = router;
