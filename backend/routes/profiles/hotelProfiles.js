const express = require('express');
const router = express.Router();
const hotelProfileController = require('../../controllers/hotelProfileController');
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

router.post('/', upload.single('image'), auth, hotelProfileController.createProfile);
router.get('/', auth, hotelProfileController.getAllProfiles);
router.get('/:id', auth, hotelProfileController.getProfileById);

module.exports = router;
