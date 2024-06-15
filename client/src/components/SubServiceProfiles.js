import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, List, ListItem, ListItemText, TextField, Button, Box } from '@mui/material';
import axios from 'axios';

const SubServiceProfiles = () => {
  const { subServiceId } = useParams();
  const [profiles, setProfiles] = useState([]);
  const [form, setForm] = useState({
    name: '',
    description: '',
    address: '',
    phone: '',
    email: '',
    image: ''
  });

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get(`/api/subservices/${subServiceId}/profiles`);
        setProfiles(response.data);
      } catch (err) {
        console.error('Failed to fetch profiles', err);
      }
    };
    fetchProfiles();
  }, [subServiceId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/profiles', { ...form, subServiceId });
      const response = await axios.get(`/api/subservices/${subServiceId}/profiles`);
      setProfiles(response.data);
      setForm({
        name: '',
        description: '',
        address: '',
        phone: '',
        email: '',
        image: ''
      });
    } catch (err) {
      console.error('Failed to create profile', err);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Profiles for {subServiceId}
      </Typography>
      <List>
        {profiles.map((profile) => (
          <ListItem key={profile._id}>
            <ListItemText primary={profile.name} secondary={profile.description} />
          </ListItem>
        ))}
      </List>
      <Typography variant="h5" gutterBottom>
        Create a new profile
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField name="name" label="Name" fullWidth margin="normal" value={form.name} onChange={handleChange} required />
        <TextField name="description" label="Description" fullWidth margin="normal" value={form.description} onChange={handleChange} />
        <TextField name="address" label="Address" fullWidth margin="normal" value={form.address} onChange={handleChange} />
        <TextField name="phone" label="Phone" fullWidth margin="normal" value={form.phone} onChange={handleChange} />
        <TextField name="email" label="Email" fullWidth margin="normal" value={form.email} onChange={handleChange} />
        <TextField name="image" label="Image URL" fullWidth margin="normal" value={form.image} onChange={handleChange} />
        <Box mt={2}>
          <Button variant="contained" color="primary" type="submit">
            Create Profile
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default SubServiceProfiles;
