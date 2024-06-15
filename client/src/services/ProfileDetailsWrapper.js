import React, { Suspense, lazy } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Box, CircularProgress, Typography } from '@mui/material';

const subServiceComponentMap = {
  "Hotels": lazy(() => import('./accommodation/hotels/hotelProfileDetails')),
  "Villas and Apartments": lazy(() => import('./accommodation/villasAndApartment/villasAndApartmentProfileDetails')),
  "Car and Bike Rentals": lazy(() => import('./transport/carAndBikeRentals/carAndBikeRentalsProfileDetails')),
  // Add other mappings here
};

const ProfileDetailsWrapper = () => {
  const { subServiceId, profileId, subServiceName } = useParams();
  const ProfileDetailsComponent = subServiceComponentMap[subServiceName];

  return (
    <Box sx={{ background: '#f0f2f5', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          {subServiceName} Profile Details
        </Typography>
        <Suspense fallback={<CircularProgress />}>
          {ProfileDetailsComponent ? (
            <ProfileDetailsComponent profileId={profileId} />
          ) : (
            <div>Profile details not found for the selected sub-service.</div>
          )}
        </Suspense>
      </Box>
      <Footer />
    </Box>
  );
};

export default ProfileDetailsWrapper;
