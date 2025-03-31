import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
  TextField,
  Button,
} from '@mui/material';
import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  YouTube as YouTubeIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
} from '@mui/icons-material';
import { keyframes } from '@mui/system';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.paper',
        py: 6,
        mt: 'auto',
        borderTop: 1,
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Contact Information */}
          <Grid item xs={12} md={4}>
            <Typography 
              variant="h6" 
              gutterBottom
              sx={{
                animation: `${fadeIn} 0.5s ease-out`,
              }}
            >
              Contact Us
            </Typography>
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mb: 2,
                animation: `${fadeIn} 0.5s ease-out 0.1s both`,
              }}
            >
              <PhoneIcon sx={{ mr: 1 }} />
              <Typography variant="body2">
                <Link href="tel:+918080281489" color="inherit">
                  +91 80802 81489
                </Link>
              </Typography>
            </Box>
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mb: 2,
                animation: `${fadeIn} 0.5s ease-out 0.2s both`,
              }}
            >
              <EmailIcon sx={{ mr: 1 }} />
              <Typography variant="body2">
                <Link href="mailto:tanmayjadhav2305@gmail.com" color="inherit">
                  tanmayjadhav2305@gmail.com
                </Link>
              </Typography>
            </Box>
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center',
                animation: `${fadeIn} 0.5s ease-out 0.3s both`,
              }}
            >
              <LocationIcon sx={{ mr: 1 }} />
              <Typography variant="body2">
                Nashik, India
              </Typography>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography 
              variant="h6" 
              gutterBottom
              sx={{
                animation: `${fadeIn} 0.5s ease-out 0.4s both`,
              }}
            >
              Quick Links
            </Typography>
            <Box 
              sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 1,
                animation: `${fadeIn} 0.5s ease-out 0.5s both`,
              }}
            >
              <Link component={RouterLink} to="/" color="inherit">
                Home
              </Link>
              <Link component={RouterLink} to="/medicines" color="inherit">
                Medicine
              </Link>
              <Link component={RouterLink} to="/about" color="inherit">
                About us
              </Link>
              <Link component={RouterLink} to="/blog" color="inherit">
                Blog
              </Link>
              <Link component={RouterLink} to="/contact" color="inherit">
                Contact us
              </Link>
            </Box>
          </Grid>

          {/* Useful Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography 
              variant="h6" 
              gutterBottom
              sx={{
                animation: `${fadeIn} 0.5s ease-out 0.6s both`,
              }}
            >
              Useful Links
            </Typography>
            <Box 
              sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 1,
                animation: `${fadeIn} 0.5s ease-out 0.7s both`,
              }}
            >
              <Link component={RouterLink} to="/privacy-policy" color="inherit">
                Privacy Policy
              </Link>
              <Link component={RouterLink} to="/refund-return" color="inherit">
                Refund & Return
              </Link>
              <Link component={RouterLink} to="/terms-conditions" color="inherit">
                Terms & Conditions
              </Link>
              <Link component={RouterLink} to="/contact" color="inherit">
                Contact Us
              </Link>
            </Box>
          </Grid>

          {/* Newsletter */}
          <Grid item xs={12} md={4}>
            <Typography 
              variant="h6" 
              gutterBottom
              sx={{
                animation: `${fadeIn} 0.5s ease-out 0.8s both`,
              }}
            >
              Subscribe Now
            </Typography>
            <Typography 
              variant="body2" 
              paragraph
              sx={{
                animation: `${fadeIn} 0.5s ease-out 0.9s both`,
              }}
            >
              Stay informed with the latest medical deals and news tailored to your needs! Sign up for our newsletter today.
            </Typography>
            <Box 
              component="form" 
              sx={{ 
                display: 'flex', 
                gap: 1,
                animation: `${fadeIn} 0.5s ease-out 1s both`,
              }}
            >
              <TextField
                fullWidth
                size="small"
                placeholder="Enter your email"
                variant="outlined"
              />
              <Button variant="contained" color="primary">
                Subscribe
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        {/* Bottom Section */}
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            flexWrap: 'wrap', 
            gap: 2,
            animation: `${fadeIn} 0.5s ease-out 1.1s both`,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Copyright {currentYear}, Designed By{' '}
            <Link
              href="https://github.com/Tanmayjadhav2305"
              target="_blank"
              rel="noopener noreferrer"
              color="primary"
            >
              Tanmay Jadhav
            </Link>
          </Typography>
          <Box>
            <IconButton color="inherit" component="a" href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FacebookIcon />
            </IconButton>
            <IconButton color="inherit" component="a" href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <TwitterIcon />
            </IconButton>
            <IconButton color="inherit" component="a" href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <YouTubeIcon />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 