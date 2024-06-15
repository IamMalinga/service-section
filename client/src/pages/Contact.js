import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Contact = () => {
  return (
    <Box sx={{ background: '#f0f2f5', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Container sx={{ flexGrow: 1, py: 4 }}>
        <Typography variant="h4" gutterBottom>Contact</Typography>
        <Typography variant="body1">Here is the contact information.</Typography>
      </Container>
      <Footer />
    </Box>
  );
};

export default Contact;
