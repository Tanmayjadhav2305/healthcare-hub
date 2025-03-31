import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Divider,
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  LocalHospital as HospitalIcon,
} from '@mui/icons-material';

const DiseaseDetails = () => {
  const { id } = useParams();

  // This would typically come from an API or database
  const disease = {
    id: 1,
    name: 'Common Cold',
    description: 'A viral infection of the nose and throat (upper respiratory tract).',
    symptoms: [
      'Runny or stuffy nose',
      'Sore throat',
      'Cough',
      'Congestion',
      'Slight body aches',
      'Mild headache',
      'Sneezing',
      'Low-grade fever',
    ],
    treatments: [
      'Rest and sleep',
      'Stay hydrated',
      'Use over-the-counter cold medications',
      'Gargle with warm salt water',
      'Use a humidifier',
    ],
    prevention: [
      'Wash hands frequently',
      'Avoid close contact with sick people',
      'Cover mouth and nose when coughing or sneezing',
      'Stay home when sick',
      'Practice good hygiene',
    ],
    image: 'https://source.unsplash.com/random/800x600/?cold',
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Disease Image */}
        <Grid item xs={12} md={6}>
          <Card>
            <Box
              component="img"
              src={disease.image}
              alt={disease.name}
              sx={{
                width: '100%',
                height: 400,
                objectFit: 'cover',
              }}
            />
          </Card>
        </Grid>

        {/* Disease Information */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" component="h1" gutterBottom>
            {disease.name}
          </Typography>
          <Typography variant="body1" paragraph>
            {disease.description}
          </Typography>

          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Symptoms
              </Typography>
              <List>
                {disease.symptoms.map((symptom, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <WarningIcon color="warning" />
                    </ListItemIcon>
                    <ListItemText primary={symptom} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>

          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Treatments
              </Typography>
              <List>
                {disease.treatments.map((treatment, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <HospitalIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={treatment} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Prevention
              </Typography>
              <List>
                {disease.prevention.map((prevention, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <CheckCircleIcon color="success" />
                    </ListItemIcon>
                    <ListItemText primary={prevention} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Typography variant="body2" color="text.secondary">
          Note: This information is for educational purposes only. Please consult a healthcare professional for medical advice.
        </Typography>
      </Box>
    </Container>
  );
};

export default DiseaseDetails; 