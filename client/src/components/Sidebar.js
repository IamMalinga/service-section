import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, ListItemIcon, Divider, Typography, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, IconButton } from '@mui/material';
import { Home, Build, AccountCircle, ExitToApp, Close } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';

const Sidebar = ({ open, onClose }) => {
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:600px)');

  const handleLogoutClick = () => {
    setLogoutDialogOpen(true);
  };

  const handleLogoutConfirm = () => {
    setLogoutDialogOpen(false);
    localStorage.removeItem('token'); // Remove token on logout
    navigate('/login');
  };

  const handleLogoutCancel = () => {
    setLogoutDialogOpen(false);
  };

  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={onClose}
      PaperProps={{
        style: {
          width: isMobile ? '100%' : 240,
          backgroundColor: '#1E2A38',
          color: '#FFF',
        },
      }}
    >
      <Box sx={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" component="div">
          Sri Travel
        </Typography>
        <IconButton onClick={onClose} sx={{ color: '#FFF' }}>
          <Close />
        </IconButton>
      </Box>
      <Divider sx={{ backgroundColor: '#FFF' }} />
      <List>
        <ListItem button component={Link} to="/" onClick={onClose}>
          <ListItemIcon sx={{ color: '#FFF' }}>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/services" onClick={onClose}>
          <ListItemIcon sx={{ color: '#FFF' }}>
            <Build />
          </ListItemIcon>
          <ListItemText primary="Services" />
        </ListItem>
        <ListItem button component={Link} to="/profiles" onClick={onClose}>
          <ListItemIcon sx={{ color: '#FFF' }}>
            <AccountCircle />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem button onClick={handleLogoutClick}>
          <ListItemIcon sx={{ color: '#FFF' }}>
            <ExitToApp />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ padding: '16px', textAlign: 'center' }}>
        <Typography variant="body2" component="div">
          © 2024 Sri Travel
        </Typography>
      </Box>
      <Dialog
        open={logoutDialogOpen}
        onClose={handleLogoutCancel}
      >
        <DialogTitle>{"Log Out"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you want to log out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogoutCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogoutConfirm} color="secondary" autoFocus>
            Log Out
          </Button>
        </DialogActions>
      </Dialog>
    </Drawer>
  );
};

export default Sidebar;
