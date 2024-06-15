import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Grid, Card, CardContent, Box, Avatar } from '@mui/material';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { styled } from '@mui/system';

// Import Material-UI icons
import { Hotel, Restaurant, DirectionsCar, Flight, LocalHospital, AccountBalance, SportsSoccer, ShoppingCart } from '@mui/icons-material';

const CardContainer = styled(Card)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2),
  margin: theme.spacing(2),
  backgroundColor: '#f5f5f5', // Change card background color
  textDecoration: 'none', // Remove underline from Link
  '&:hover': {
    backgroundColor: '#e0e0e0', // Change color on hover
  },
}));

const CardContentStyled = styled(CardContent)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
}));

const AvatarStyled = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  marginRight: theme.spacing(2),
}));

const serviceIcons = {
  "Accommodation": <Hotel />,
  "Food and Beverage": <Restaurant />,
  "Transportation": <DirectionsCar />,
  "Tour and Travel Services": <Flight />,
  "Healthcare Services": <LocalHospital />,
  "Banking and Financial Services": <AccountBalance />,
  "Recreational and Leisure Activities": <SportsSoccer />,
  "Shopping": <ShoppingCart />,
};

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      const response = await axios.get('http://localhost:5000/api/services');
      setServices(response.data);
    };
    fetchServices();
  }, []);

  return (
    <Box
      sx={{
        background: '#fff',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        pt: 8, // Add padding to the top to prevent overlap
      }}
    >
      <Header />
      <Container sx={{ flexGrow: 1, py: 4 }}>
        <Typography variant="h4" gutterBottom>
          All Services
        </Typography>
        <Grid container spacing={2}>
          {services.map(service => (
            <Grid item xs={12} sm={6} md={4} key={service._id}>
              <CardContainer component={Link} to={`/services/${service._id}`}>
                <AvatarStyled>
                  {serviceIcons[service.name] || <Hotel />} {/* Default icon if not found */}
                </AvatarStyled>
                <CardContentStyled>
                  <Typography variant="h6">{service.name}</Typography>
                  <Typography variant="body2" color="textSecondary">{service.description}</Typography>
                </CardContentStyled>
              </CardContainer>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
};

export default Services;
