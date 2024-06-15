import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, Grid, FormControlLabel, Checkbox, Paper } from '@mui/material';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/images/marker-shadow.png'; // Ensure marker shadow is imported
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix for default Marker icon
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const ProfileCreate = () => {
  const { subServiceId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    phone: '',
    email: '',
    image: null,
    latitude: '',
    longitude: ''
  });
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const [position, setPosition] = useState([7.8731, 80.7718]); // Default position for map center
  const mapRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === 'latitude' || name === 'longitude') {
      setPosition([parseFloat(formData.latitude), parseFloat(formData.longitude)]);
    }
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setFormData({
          ...formData,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setPosition([position.coords.latitude, position.coords.longitude]);
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const profileData = new FormData();
    profileData.append('name', formData.name);
    profileData.append('description', formData.description);
    profileData.append('address', formData.address);
    profileData.append('phone', formData.phone);
    profileData.append('email', formData.email);
    profileData.append('image', formData.image);
    profileData.append('latitude', formData.latitude);
    profileData.append('longitude', formData.longitude);
    profileData.append('subServiceId', subServiceId);
    try {
      await axios.post(`http://localhost:5000/api/profiles`, profileData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate(`/profiles/${subServiceId}`);
    } catch (error) {
      console.error('Failed to create profile', error);
    }
  };

  const MapClickHandler = () => {
    const map = useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]);
        setFormData({
          ...formData,
          latitude: lat,
          longitude: lng,
        });
        map.setView([lat, lng], map.getZoom());
      },
    });
    return null;
  };

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView(position, mapRef.current.getZoom());
    }
  }, [position]);

  return (
    <Box
      sx={{
        background: '#f0f2f5',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Header />
      <Container sx={{ flexGrow: 1, py: 4 }}>
        <Typography variant="h4" gutterBottom>Create Profile</Typography>
        <Paper sx={{ p: 4, mt: 2 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <form onSubmit={handleSubmit} encType="multipart/form-data">
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
                  label="Description" 
                  name="description" 
                  value={formData.description} 
                  onChange={handleChange} 
                  fullWidth 
                  margin="normal" 
                  required 
                  multiline 
                  rows={4} 
                />
                <TextField 
                  label="Address" 
                  name="address" 
                  value={formData.address} 
                  onChange={handleChange} 
                  fullWidth 
                  margin="normal" 
                  required 
                />
                <TextField 
                  label="Phone" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleChange} 
                  fullWidth 
                  margin="normal" 
                  required 
                />
                <TextField 
                  label="Email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  fullWidth 
                  margin="normal" 
                  required 
                />
                <Button 
                  variant="contained" 
                  component="label" 
                  fullWidth 
                  sx={{ mt: 2, mb: 2 }}
                >
                  Upload Image
                  <input type="file" hidden onChange={handleFileChange} required />
                </Button>
                <FormControlLabel
                  control={<Checkbox checked={useCurrentLocation} onChange={() => setUseCurrentLocation(!useCurrentLocation)} />}
                  label="Use Current Location"
                />
                {useCurrentLocation ? (
                  <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleLocation} 
                    fullWidth 
                    sx={{ mt: 2, mb: 2 }}
                  >
                    Get Current Location
                  </Button>
                ) : (
                  <>
                    <TextField 
                      label="Latitude" 
                      name="latitude" 
                      value={formData.latitude} 
                      onChange={handleChange} 
                      fullWidth 
                      margin="normal" 
                      required 
                    />
                    <TextField 
                      label="Longitude" 
                      name="longitude" 
                      value={formData.longitude} 
                      onChange={handleChange} 
                      fullWidth 
                      margin="normal" 
                      required 
                    />
                  </>
                )}
                <Button 
                  type="submit" 
                  variant="contained" 
                  color="primary" 
                  fullWidth 
                  sx={{ mt: 2 }}
                >
                  Create Profile
                </Button>
              </form>
            </Grid>
            <Grid item xs={12} md={6}>
              <MapContainer center={position} zoom={13} style={{ height: "400px", width: "100%" }} whenCreated={mapInstance => { mapRef.current = mapInstance; }}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}></Marker>
                <MapClickHandler />
              </MapContainer>
            </Grid>
          </Grid>
        </Paper>
      </Container>
      <Footer />
    </Box>
  );
};

export default ProfileCreate;
