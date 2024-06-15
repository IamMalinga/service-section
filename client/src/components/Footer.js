import React from 'react';
import { Container, Grid, Typography, Box, Link } from '@mui/material';
import { Facebook, Twitter, Instagram } from '@mui/icons-material';
import { styled } from '@mui/system';

const FooterContainer = styled('footer')(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  marginTop: 'auto',
}));

const FooterIcon = styled('div')(({ theme }) => ({
  display: 'inline-block',
  margin: theme.spacing(1),
  cursor: 'pointer',
  '&:hover': {
    color: theme.palette.secondary.main,
  },
}));

const FooterLink = styled(Link)(({ theme }) => ({
  display: 'block',
  color: 'inherit',
  textDecoration: 'none',
  marginBottom: theme.spacing(1),
  '&:hover': {
    textDecoration: 'underline',
  },
}));

const Footer = () => {
  return (
    <FooterContainer>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Sri Travel
            </Typography>
            <Typography variant="body2">
              Discover, Explore, Wander. Experience the beauty of Sri Lanka.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Box>
              <FooterLink href="/">Home</FooterLink>
              <FooterLink href="/about">About</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Box>
              <FooterIcon>
                <Facebook />
              </FooterIcon>
              <FooterIcon>
                <Twitter />
              </FooterIcon>
              <FooterIcon>
                <Instagram />
              </FooterIcon>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
