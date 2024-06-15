const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

connectDB();

app.use('/api/auth', require('./routes/auth'));
app.use('/api/services', require('./routes/services'));
app.use('/api/subservices', require('./routes/subservices'));
app.use('/api/profiles', require('./routes/profiles')); // This should include the profiles route which further includes specific profile routes

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
