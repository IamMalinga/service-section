import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, List, ListItem, ListItemText, Box } from '@mui/material';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

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

  if (!service) return <Typography variant="h6">Loading Sub Page...</Typography>;

  return (
    <Box
      sx={{
        background: '#fff',
        minHeight: '100vh',w
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Header />
      <Container>
        <Typography variant="h4" gutterBottom>
          {service.name}
        </Typography>
        <List>
          {service.subServices.map((subService) => (
            <ListItem key={subService._id}>
              <ListItemText primary={subService.name} />
            </ListItem>
          ))}
        </List>
      </Container>
      <Footer />
    </Box>
  );
};

export default SubServices;
