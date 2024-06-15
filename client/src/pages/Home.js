import React from 'react';
import { Box, Button, Typography, Container, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import welcomeImage from '../assets/welcome.jpg';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        background: '#fff',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Header />
      <Container maxWidth="lg" sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', py: 8 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h2" gutterBottom sx={{ fontWeight: 'bold', color: '#2C3E50' }}>
              Welcome to the Sri Travels Service Providing System
            </Typography>
            <Box mt={4} display="flex" justifyContent={{ xs: 'center', md: 'flex-start' }} flexWrap="wrap">
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{ marginRight: 2, marginBottom: { xs: 2, md: 0 }, backgroundColor: '#2980B9', '&:hover': { backgroundColor: '#3498DB' } }}
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                sx={{ backgroundColor: '#E74C3C', '&:hover': { backgroundColor: '#C0392B' } }}
                onClick={() => navigate('/register')}
              >
                Register
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} display="flex" justifyContent="center">
            <img src={welcomeImage} alt="Welcome" style={{ maxWidth: '100%', borderRadius: '8px' }} />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
};

export default Home;
