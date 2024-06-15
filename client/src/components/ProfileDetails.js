// frontend/src/components/ProfileDetails.js
import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Box, Paper, Grid, Card, CardContent, CardMedia } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AddRoom from '../components/AddRoom';
import AddFood from '../components/AddFood';
import { AuthContext } from '../context/AuthContext';

const ProfileDetails = () => {
  const { profileId } = useParams();
  const [profile, setProfile] = useState(null);
  const [openAddRoom, setOpenAddRoom] = useState(false);
  const [openAddFood, setOpenAddFood] = useState(false);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) {
      navigate('/login');
    } else {
      const fetchProfile = async () => {
        try {
          const token = auth;
          const response = await axios.get(
            `http://localhost:5000/api/profiles/${profileId}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setProfile(response.data);
        } catch (err) {
          console.error('Failed to fetch profile', err);
          if (err.response && err.response.status === 401) {
            navigate('/login');
          }
        }
      };
      fetchProfile();
    }
  }, [profileId, auth, navigate]);

  const handleRoomAdded = (updatedProfile) => {
    setProfile(updatedProfile);
  };

  const handleFoodAdded = (updatedProfile) => {
    setProfile(updatedProfile);
  };

  if (!profile) return <Typography variant="h6">Loading...</Typography>;

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
      <Container sx={{ flexGrow: 1, py: 4, pt: 8 }}>
        <Paper sx={{ p: 4, boxShadow: 3, borderRadius: 2 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#2C3E50' }}>
            {profile.name}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'flex-start' }, mb: 2, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => setOpenAddRoom(true)}
              sx={{ mr: { xs: 0, sm: 2 }, mb: { xs: 2, sm: 0 }, width: '150px', height: '50px' }}
            >
              Add Room
            </Button>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<AddIcon />}
              onClick={() => setOpenAddFood(true)}
              sx={{ width: '150px', height: '50px' }}
            >
              Add Food
            </Button>
          </Box>
          <AddRoom open={openAddRoom} onClose={() => setOpenAddRoom(false)} profileId={profileId} onRoomAdded={handleRoomAdded} />
          <AddFood open={openAddFood} onClose={() => setOpenAddFood(false)} profileId={profileId} onFoodAdded={handleFoodAdded} />

          <Box mt={4}>
            <Typography variant="h5" gutterBottom>Rooms</Typography>
            <Grid container spacing={2}>
              {profile.rooms.map((room) => (
                <Grid item xs={12} sm={6} md={4} key={room._id}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="140"
                      image={`http://localhost:5000${room.images[0]}`}
                      alt={room.name}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {room.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {room.description}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Price: {room.price}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Availability: {room.availability}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Box mt={4}>
            <Typography variant="h5" gutterBottom>Foods</Typography>
            <Grid container spacing={2}>
              {profile.foods.map((food) => (
                <Grid item xs={12} sm={6} md={4} key={food._id}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="140"
                      image={`http://localhost:5000${food.image}`}
                      alt={food.name}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {food.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {food.description}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Price: {food.price}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Paper>
      </Container>
      <Footer />
    </Box>
  );
};

export default ProfileDetails;
