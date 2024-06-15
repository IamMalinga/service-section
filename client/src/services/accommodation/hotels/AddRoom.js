import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, DialogActions } from '@mui/material';
import axios from 'axios';

const AddRoom = ({ open, onClose, profileId, onRoomAdded }) => {
  const [roomData, setRoomData] = useState({
    name: '',
    description: '',
    price: '',
    availability: '',
    images: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoomData({ ...roomData, [name]: value });
  };

  const handleFileChange = (e) => {
    setRoomData({ ...roomData, images: e.target.files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const formData = new FormData();
    Object.keys(roomData).forEach((key) => {
      if (key === 'images') {
        Array.from(roomData.images).forEach((file) => {
          formData.append('images', file);
        });
      } else {
        formData.append(key, roomData[key]);
      }
    });

    try {
      const response = await axios.post(`http://localhost:5000/api/hotels/${profileId}/rooms`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
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
        <TextField label="Name" name="name" value={roomData.name} onChange={handleChange} fullWidth margin="normal" required />
        <TextField label="Description" name="description" value={roomData.description} onChange={handleChange} fullWidth margin="normal" required multiline rows={4} />
        <TextField label="Price" name="price" value={roomData.price} onChange={handleChange} fullWidth margin="normal" required />
        <TextField label="Availability" name="availability" value={roomData.availability} onChange={handleChange} fullWidth margin="normal" required />
        <Button variant="contained" component="label" fullWidth sx={{ mt: 2, mb: 2 }}>
          Upload Images
          <input type="file" hidden multiple onChange={handleFileChange} required />
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Cancel</Button>
        <Button onClick={handleSubmit} color="primary">Add Room</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddRoom;
