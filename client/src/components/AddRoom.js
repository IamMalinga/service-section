// AddRoom.js
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, DialogActions } from '@mui/material';
import axios from 'axios';

const AddRoom = ({ open, onClose, profileId, onRoomAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    availability: '',
    images: []
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const form = new FormData();
      form.append('name', formData.name);
      form.append('price', formData.price);
      form.append('description', formData.description);
      form.append('availability', formData.availability);
      formData.images.forEach((image) => {
        form.append('images', image);
      });
      const response = await axios.post(
        `http://localhost:5000/api/profiles/${profileId}/rooms`,
        form,
        { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } }
      );
      onRoomAdded(response.data);
      onClose();
    } catch (error) {
      console.error('Failed to add room', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Room</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Availability"
            name="availability"
            type="number"
            value={formData.availability}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            required
          />
          <DialogActions>
            <Button onClick={onClose} color="secondary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Add Room
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddRoom;
