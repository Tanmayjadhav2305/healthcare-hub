import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  LocalHospital as HospitalIcon,
  Medication as MedicineIcon,
  Favorite as FavoriteIcon,
  History as HistoryIcon,
} from '@mui/icons-material';

const Dashboard = () => {
  const navigate = useNavigate();

  const dashboardItems = [
    {
      title: 'Health Monitoring',
      description: 'Track your health status and symptoms',
      icon: <HospitalIcon sx={{ fontSize: 40 }} />,
      path: '/health-monitoring',
      color: '#1976d2',
    },
    {
      title: 'Medicine Catalog',
      description: 'Browse and order medicines',
      icon: <MedicineIcon sx={{ fontSize: 40 }} />,
      path: '/medicines',
      color: '#2e7d32',
    },
    {
      title: 'Diseases Information',
      description: 'Learn about common diseases and treatments',
      icon: <FavoriteIcon sx={{ fontSize: 40 }} />,
      path: '/diseases',
      color: '#d32f2f',
    },
    {
      title: 'Order History',
      description: 'View your past orders and prescriptions',
      icon: <HistoryIcon sx={{ fontSize: 40 }} />,
      path: '/orders',
      color: '#ed6c02',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to Your Dashboard
      </Typography>

      <Grid container spacing={3}>
        {dashboardItems.map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item.title}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  transition: 'transform 0.2s ease-in-out',
                },
              }}
              onClick={() => navigate(item.path)}
            >
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: `${item.color}15`,
                      borderRadius: '50%',
                      p: 2,
                      mb: 2,
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Typography variant="h6" component="h2" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Dashboard; 