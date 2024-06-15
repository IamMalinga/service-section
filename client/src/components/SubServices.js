import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Typography, Grid, Card, CardContent, Box, Avatar } from '@mui/material';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { styled } from '@mui/system';

// Import Material-UI icons
import { Hotel, Restaurant, DirectionsCar, Flight, LocalHospital, AccountBalance, SportsSoccer, ShoppingCart, Home, Apartment, LocalLaundryService, LocalCafe, LocalBar, Commute, LocalTaxi, Public, Event, MedicalServices, AttachMoney, Payment, Spa, FitnessCenter, Museum, Store, ShoppingBasket, Shop } from '@mui/icons-material';

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

const subServiceIcons = {
  "Hotels": <Hotel />,
  "Guesthouses and Homestays": <Home />,
  "Boutique Hotels": <Apartment />,
  "Hostels": <Home />,
  "Villas and Apartments": <Apartment />,
  "Laundry Services": <LocalLaundryService />,
  "Restaurants": <Restaurant />,
  "Cafés and Coffee Shops": <LocalCafe />,
  "Street Food Stalls": <Restaurant />,
  "Bars and Pubs": <LocalBar />,
  "Car and Bike Rentals": <DirectionsCar />,
  "Chauffeur Services": <Commute />,
  "Public Transport": <Public />,
  "Taxis and Ride-Hailing Services": <LocalTaxi />,
  "Tuk-Tuks": <DirectionsCar />,
  "Tour Operators": <Flight />,
  "Travel Agencies": <Flight />,
  "Information Centers": <Event />,
  "Special Events": <Event />,
  "Hospitals and Clinics": <MedicalServices />,
  "Pharmacies": <MedicalServices />,
  "ATMs": <AttachMoney />,
  "Currency Exchange": <AttachMoney />,
  "Mobile Payment Services": <Payment />,
  "Spas and Wellness Centers": <Spa />,
  "Adventure Sports": <FitnessCenter />,
  "Cultural Experiences": <Museum />,
  "Local Markets and Bazaars": <Store />,
  "Shopping Malls": <ShoppingBasket />,
  "Specialty Stores": <Shop />,
};

const SubServices = () => {
  const { serviceId } = useParams();
  const [service, setService] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/services/${serviceId}`);
        setService(response.data);
      } catch (err) {
        console.error('Failed to fetch service', err);
      }
    };
    fetchService();
  }, [serviceId]);

  if (!service) return <Typography variant="h6">Loading Sub...</Typography>;
  if (!service.subServices || !Array.isArray(service.subServices)) return <Typography variant="h6">No sub-services available</Typography>;

  return (
    <Box sx={{ background: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column', pt: 8 }}>
      <Header />
      <Container sx={{ flexGrow: 1, py: 4 }}>
        <Typography variant="h4" gutterBottom>{service.name}</Typography>
        <Grid container spacing={2}>
          {service.subServices.map(subService => (
            <Grid item xs={12} sm={6} md={4} key={subService._id}>
              <CardContainer component={Link} to={`/profiles/create/${subService._id}/${subService.name}`}>
                <AvatarStyled>{subServiceIcons[subService.name] || <Hotel />}</AvatarStyled>
                <CardContentStyled>
                  <Typography variant="h6">{subService.name}</Typography>
                  <Typography variant="body2" color="textSecondary">{subService.description}</Typography>
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

export default SubServices;
