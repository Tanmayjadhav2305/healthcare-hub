import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Box,
  Stack,
} from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MedicationIcon from '@mui/icons-material/Medication';
import PeopleIcon from '@mui/icons-material/People';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ScienceIcon from '@mui/icons-material/Science';

const features = [
  {
    title: 'Expert Doctors',
    description: 'Access to experienced healthcare professionals',
    icon: <LocalHospitalIcon sx={{ fontSize: 40 }} />,
    color: '#1976d2',
  },
  {
    title: 'Quality Medicines',
    description: 'Wide range of authentic medicines',
    icon: <MedicationIcon sx={{ fontSize: 40 }} />,
    color: '#2e7d32',
  },
  {
    title: 'Patient Care',
    description: '24/7 support and care for patients',
    icon: <PeopleIcon sx={{ fontSize: 40 }} />,
    color: '#ed6c02',
  },
  {
    title: '24/7 Service',
    description: 'Round the clock medical assistance',
    icon: <AccessTimeIcon sx={{ fontSize: 40 }} />,
    color: '#9c27b0',
  },
  {
    title: 'Disease Information',
    description: 'Comprehensive information about various diseases',
    icon: <ScienceIcon sx={{ fontSize: 40 }} />,
    color: '#d32f2f',
  },
];

const Home = () => {
  const navigate = useNavigate();

  const handleLearnMore = () => {
    navigate('/medicines');
  };

  const handleDiseases = () => {
    navigate('/diseases');
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          mb: 6,
          backgroundImage: 'linear-gradient(45deg, #1976d2 30%, #21CBF3 90%)',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" component="h1" gutterBottom>
                Welcome to HealthCare Hub
              </Typography>
              <Typography variant="h5" paragraph>
                Your comprehensive healthcare solution for medicines, diseases, and expert care
              </Typography>
              <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={handleLearnMore}
                >
                  Explore Medicines
                </Button>
                <Button
                  variant="outlined"
                  color="inherit"
                  size="large"
                  onClick={handleDiseases}
                >
                  Learn About Diseases
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Healthcare"
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography variant="h4" component="h2" gutterBottom align="center">
          Our Services
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <CardContent sx={{ textAlign: 'center' }}>
                  <Box sx={{ color: feature.color, mb: 2 }}>{feature.icon}</Box>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Call to Action Section */}
      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container maxWidth="md">
          <Typography variant="h4" component="h2" align="center" gutterBottom>
            Ready to Get Started?
          </Typography>
          <Typography variant="body1" align="center" paragraph>
            Join our healthcare platform and experience the best medical services
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => navigate('/register')}
            >
              Register Now
            </Button>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 