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
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  LocalHospital as HospitalIcon,
  Medication as MedicationIcon,
  People as PeopleIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { keyframes } from '@mui/system';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const fadeInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const features = [
  {
    title: 'Best Medical Care',
    description: 'We pride ourselves in making personalized care and service a priority',
    icon: <HospitalIcon sx={{ fontSize: 40 }} />,
    color: '#1976d2',
    buttonText: 'SHOP NOW',
  },
  {
    title: 'Big Discount',
    description: 'Offering a range of medicines and other healthcare products! Find any medicine you need',
    icon: <MedicationIcon sx={{ fontSize: 40 }} />,
    color: '#2e7d32',
    buttonText: '20% OFF',
  },
  {
    title: 'Health Monitoring',
    description: 'We pride ourselves in making personalized care and service a priority',
    icon: <PeopleIcon sx={{ fontSize: 40 }} />,
    color: '#ed6c02',
    buttonText: 'SHOP NOW',
  },
];

const categories = [
  { name: 'ARTHRITIS MEDICINES', count: 0 },
  { name: 'CRITICAL CARE MEDICINES', count: 0 },
  { name: 'GASTROENTEROLOGIST MEDICINE', count: 2 },
  { name: 'GYNECOLOGY MEDICINES', count: 0 },
  { name: 'HEMATOLOGY MEDICINES', count: 7 },
  { name: 'HIV & AIDS MEDICINES', count: 35 },
  { name: 'LEPRA REACTION MEDICINES', count: 0 },
  { name: 'LIVER DISEASE MEDICINES', count: 1 },
  { name: 'NEPHROLOGY MEDICINES', count: 2 },
  { name: 'ONCOLOGY MEDICINES', count: 9 },
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
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography 
                variant="h2" 
                component="h1" 
                gutterBottom
                sx={{
                  animation: `${fadeInLeft} 0.8s ease-out`,
                }}
              >
                Best choice Best Medical Care
              </Typography>
              <Typography 
                variant="h5" 
                paragraph
                sx={{
                  animation: `${fadeInLeft} 0.8s ease-out 0.2s both`,
                }}
              >
                For Your Family We pride ourselves in making personalized care and service a priority
              </Typography>
              <Stack 
                direction="row" 
                spacing={2} 
                sx={{ 
                  mt: 2,
                  animation: `${fadeInLeft} 0.8s ease-out 0.4s both`,
                }}
              >
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={handleLearnMore}
                >
                  SHOP NOW
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
                  animation: `${fadeInRight} 0.8s ease-out`,
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Search Section */}
      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search for medicines..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ 
            mb: 4,
            animation: `${fadeInUp} 0.8s ease-out`,
          }}
        />
      </Container>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item key={index} xs={12} md={4}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                  },
                  animation: `${scaleIn} 0.8s ease-out ${index * 0.2}s both`,
                }}
              >
                <CardContent sx={{ textAlign: 'center' }}>
                  <Box sx={{ color: feature.color, mb: 2 }}>{feature.icon}</Box>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {feature.description}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleLearnMore}
                  >
                    {feature.buttonText}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Categories Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography 
          variant="h4" 
          component="h2" 
          gutterBottom 
          align="center"
          sx={{
            animation: `${fadeInUp} 0.8s ease-out`,
          }}
        >
          Shop by Category
        </Typography>
        <Grid container spacing={2}>
          {categories.map((category, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  cursor: 'pointer',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    backgroundColor: 'primary.light',
                    color: 'white',
                    transform: 'scale(1.02)',
                  },
                  animation: `${fadeInUp} 0.8s ease-out ${index * 0.1}s both`,
                }}
                onClick={() => navigate('/medicines')}
              >
                <CardContent>
                  <Typography variant="h6" component="h3">
                    {category.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {category.count} products
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Doctor Consultation Section */}
      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container maxWidth="lg">
          <Card
            sx={{
              animation: `${fadeInUp} 0.8s ease-out`,
            }}
          >
            <CardContent>
              <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={8}>
                  <Typography variant="h4" component="h2" gutterBottom>
                    Book An Appointment Doctor Consult
                  </Typography>
                  <Typography variant="body1" paragraph>
                    Consultation on chat or call available 24/7
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    onClick={() => navigate('/doctor-dashboard')}
                  >
                    Consult Now
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 