import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Badge,
  Box,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Menu as MenuIcon,
  ShoppingCart,
  Person,
  ExitToApp,
  Dashboard,
  Edit,
  LocalHospital,
  UploadFile,
} from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
    handleClose();
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const menuItems = [
    { text: 'Home', path: '/' },
    { text: 'Medicines', path: '/medicines' },
    { text: 'Diseases', path: '/diseases' },
  ];

  const userMenuItems = user
    ? [
        {
          text: 'Dashboard',
          path: user.role === 'doctor' ? '/doctor-dashboard' : '/patient-dashboard',
          icon: <Dashboard />,
        },
        { text: 'Profile', path: '/profile', icon: <Person /> },
        { text: 'Edit Profile', path: '/edit-profile', icon: <Edit /> },
        { text: 'Upload Prescription', path: '/upload-prescription', icon: <UploadFile /> },
        { text: 'Logout', onClick: handleLogout, icon: <ExitToApp /> },
      ]
    : [];

  const renderMobileMenu = () => (
    <Drawer
      anchor="right"
      open={mobileMenuOpen}
      onClose={handleMobileMenuToggle}
      PaperProps={{
        sx: { width: 240 },
      }}
    >
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={RouterLink}
            to={item.path}
            onClick={handleMobileMenuToggle}
          >
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        <Divider />
        {user ? (
          userMenuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              component={item.onClick ? 'div' : RouterLink}
              to={item.path}
              onClick={item.onClick || handleMobileMenuToggle}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))
        ) : (
          <>
            <ListItem
              button
              component={RouterLink}
              to="/login"
              onClick={handleMobileMenuToggle}
            >
              <ListItemText primary="Login" />
            </ListItem>
            <ListItem
              button
              component={RouterLink}
              to="/register"
              onClick={handleMobileMenuToggle}
            >
              <ListItemText primary="Register" />
            </ListItem>
          </>
        )}
      </List>
    </Drawer>
  );

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'inherit',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <LocalHospital sx={{ mr: 1 }} />
          Healthcare Hub
        </Typography>

        {isMobile ? (
          <>
            <IconButton
              color="inherit"
              onClick={handleMobileMenuToggle}
              sx={{ ml: 2 }}
            >
              <MenuIcon />
            </IconButton>
            {renderMobileMenu()}
          </>
        ) : (
          <>
            <Box sx={{ display: 'flex', gap: 2, mr: 2 }}>
              {menuItems.map((item) => (
                <Button
                  key={item.text}
                  color="inherit"
                  component={RouterLink}
                  to={item.path}
                >
                  {item.text}
                </Button>
              ))}
            </Box>

            <IconButton
              color="inherit"
              component={RouterLink}
              to="/cart"
              sx={{ mr: 2 }}
            >
              <Badge badgeContent={cart.length} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>

            {user ? (
              <>
                <IconButton
                  color="inherit"
                  onClick={handleMenu}
                >
                  <Person />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  {userMenuItems.map((item) => (
                    <MenuItem
                      key={item.text}
                      component={item.onClick ? 'div' : RouterLink}
                      to={item.path}
                      onClick={item.onClick || handleClose}
                    >
                      {item.icon}
                      <Box sx={{ ml: 1 }}>{item.text}</Box>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  color="inherit"
                  component={RouterLink}
                  to="/login"
                >
                  Login
                </Button>
                <Button
                  color="inherit"
                  component={RouterLink}
                  to="/register"
                >
                  Register
                </Button>
              </Box>
            )}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 