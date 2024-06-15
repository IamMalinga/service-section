import React, { Suspense, lazy } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Box, CircularProgress, Typography } from '@mui/material';

const subServiceComponentMap = {
  "Hotels": lazy(() => import('./accommodation/hotels/hotelProfileCreate')),
  "Car and Bike Rentals": lazy(() => import('./transport/carAndBikeRentals/carAndBikeRentalsProfileCreate')),
  // Add other mappings here
};

const ProfileCreateWrapper = () => {
  const { subServiceId, subServiceName } = useParams();
  const ProfileCreateComponent = subServiceComponentMap[subServiceName];

  return (
    <Box sx={{ background: '#f0f2f5', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Create {subServiceName} Profile
        </Typography>
        <Suspense fallback={<CircularProgress />}>
          {ProfileCreateComponent ? (
            <ProfileCreateComponent subServiceId={subServiceId} />
          ) : (
            <div>Profile creation form not found for the selected sub-service.</div>
          )}
        </Suspense>
      </Box>
      <Footer />
    </Box>
  );
};

export default ProfileCreateWrapper;
