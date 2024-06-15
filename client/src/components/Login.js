import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, Grid, Paper, FormControlLabel, Checkbox, Link } from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import { loginUser } from '../api/api';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ username, password });
      setAuth(response.data.token);
      if (rememberMe) {
        localStorage.setItem('token', response.data.token);
      } else {
        sessionStorage.setItem('token', response.data.token);
      }
      navigate('/services');
    } catch (error) {
      console.error('Failed to login', error);
    }
  };

  return (
    <Box
      sx={{
        background: '#f0f2f5',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        pt: 8, // Add padding to the top to prevent overlap
      }}
    >
      <Header />
      <Container sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', py: 4 }}>
        <Paper elevation={3} sx={{ padding: 4, maxWidth: 1000, width: '100%', borderRadius: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Typography variant="h4" gutterBottom>Login</Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  fullWidth
                  margin="normal"
                  required
                />
                <TextField
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                  margin="normal"
                  required
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Remember Me"
                />
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2, mb: 1 }}>
                  Login
                </Button>
                <Link
                  href="#"
                  variant="body2"
                  onClick={() => navigate('/forgot-password')}
                  sx={{ display: 'block', textAlign: 'center' }}
                >
                  Forgot Password?
                </Link>
              </form>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="/assets/login.jpg" // Ensure this path is correct and image exists in public/assets directory
                alt="Login illustration"
                sx={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
              />
            </Grid>
          </Grid>
        </Paper>
      </Container>
      <Footer />
    </Box>
  );
};

export default Login;
