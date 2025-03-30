import React from 'react';
import {
  Box,
  Container,
  Typography,
  Link,
  Grid,
  Divider,
} from '@mui/material';
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
} from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Contact Us
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <EmailIcon sx={{ mr: 1 }} />
              <Link
                href="mailto:tanmayjadhav2305@gmail.com"
                color="inherit"
                underline="hover"
              >
                tanmayjadhav2305@gmail.com
              </Link>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <PhoneIcon sx={{ mr: 1 }} />
              <Link
                href="tel:+918080281489"
                color="inherit"
                underline="hover"
              >
                +91 8080281489
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/" color="inherit" underline="hover">
                Home
              </Link>
              <Link href="/medicines" color="inherit" underline="hover">
                Medicines
              </Link>
              <Link href="/doctor-dashboard" color="inherit" underline="hover">
                Doctor Dashboard
              </Link>
              <Link href="/patient-dashboard" color="inherit" underline="hover">
                Patient Dashboard
              </Link>
            </Box>
          </Grid>
        </Grid>
        <Divider sx={{ my: 3 }} />
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mt: 2 }}
        >
          © {new Date().getFullYear()} Hospital Management System. Developed by{' '}
          <Typography
            component="span"
            variant="body2"
            color="primary"
            fontWeight="bold"
          >
            Tanmay Jadhav
          </Typography>
          . All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer; 