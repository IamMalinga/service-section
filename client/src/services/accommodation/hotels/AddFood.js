import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, DialogActions } from '@mui/material';
import axios from 'axios';

const AddFood = ({ open, onClose, profileId, onFoodAdded }) => {
  const [foodData, setFoodData] = useState({
    name: '',
    description: '',
    price: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFoodData({ ...foodData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFoodData({ ...foodData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const formData = new FormData();
    Object.keys(foodData).forEach((key) => {
      formData.append(key, foodData[key]);
    });

    try {
      const response = await axios.post(`http://localhost:5000/api/hotels/${profileId}/foods`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      onFoodAdded(response.data);
      onClose();
    } catch (error) {
      console.error('Failed to add food', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Food</DialogTitle>
      <DialogContent>
        <TextField label="Name" name="name" value={foodData.name} onChange={handleChange} fullWidth margin="normal" required />
        <TextField label="Description" name="description" value={foodData.description} onChange={handleChange} fullWidth margin="normal" required multiline rows={4} />
        <TextField label="Price" name="price" value={foodData.price} onChange={handleChange} fullWidth margin="normal" required />
        <Button variant="contained" component="label" fullWidth sx={{ mt: 2, mb: 2 }}>
          Upload Image
          <input type="file" hidden onChange={handleFileChange} required />
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Cancel</Button>
        <Button onClick={handleSubmit} color="primary">Add Food</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddFood;
