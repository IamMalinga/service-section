import React, { useEffect, useState, useContext } from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, CardActionArea, CardMedia } from '@mui/material';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ProfileList = () => {
  const [profiles, setProfiles] = useState([]);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/profiles', {
          headers: { Authorization: `Bearer ${auth}` },
        });
        setProfiles(response.data);
      } catch (error) {
        console.error('Failed to fetch profiles', error);
      }
    };

    fetchProfiles();
  }, [auth]);

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
        <Typography variant="h4" gutterBottom>
          Profile List
        </Typography>
        <Grid container spacing={4}>
          {profiles.map((profile) => (
            <Grid item xs={12} sm={6} md={4} key={profile._id}>
              <Card>
                <CardActionArea onClick={() => navigate(`/profiles/${profile._id}/${profile.subServiceId.name}`)}>
                  {profile.image && (
                    <CardMedia
                      component="img"
                      height="140"
                      image={`http://localhost:5000${profile.image}`}
                      alt={profile.name}
                    />
                  )}
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {profile.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {`${profile.subServiceId.serviceId.name} - ${profile.subServiceId.name}`}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
};

export default ProfileList;
