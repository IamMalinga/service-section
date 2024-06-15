// frontend/src/components/AddService.js
import React, { useState } from 'react';
import { TextField, Button, MenuItem, Typography } from '@mui/material';
import { addService } from '../api/api';

const serviceTypes = {
  'Accommodation': ['Hotels', 'Guesthouses', 'Boutique Hotels', 'Hostels', 'Villas and Apartments', 'Laundry Services'],
  'Food': ['Restaurants', 'Cafés', 'Street Food', 'Bars'],
  'Transportation': ['Car Rentals', 'Chauffeur Services', 'Public Transport', 'Taxis', 'Tuk-Tuks'],
  'TourTravel': ['Tour Operators', 'Travel Agencies', 'Info Centers', 'Special Events'],
  'Healthcare': ['Hospitals', 'Pharmacies'],
  'Banking': ['ATMs', 'Currency Exchange', 'Mobile Payments'],
  'Recreation': ['Spas', 'Adventure Sports', 'Cultural Experiences'],
  'Shopping': ['Local Markets', 'Shopping Malls', 'Specialty Stores']
};

function AddService() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [subType, setSubType] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const serviceData = { name, description, type, subType, latitude, longitude, image };
    try {
      await addService(serviceData);
      alert('Service added successfully');
    } catch (error) {
      console.error('Error adding service', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h4">Add Service</Typography>
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
      />
      <TextField
        select
        label="Type"
        value={type}
        onChange={(e) => setType(e.target.value)}
        fullWidth
      >
        {Object.keys(serviceTypes).map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      {type && (
        <TextField
          select
          label="Sub-Type"
          value={subType}
          onChange={(e) => setSubType(e.target.value)}
          fullWidth
        >
          {serviceTypes[type].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      )}
      <TextField
        label="Latitude"
        value={latitude}
        onChange={(e) => setLatitude(e.target.value)}
        fullWidth
      />
      <TextField
        label="Longitude"
        value={longitude}
        onChange={(e) => setLongitude(e.target.value)}
        fullWidth
      />
      <TextField
        label="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        fullWidth
      />
      <Button type="submit" variant="contained" color="primary">
        Add Service
      </Button>
    </form>
  );
}

export default AddService;
