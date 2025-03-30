import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Box,
  Chip,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import {
  LocalHospital,
  Healing,
  Warning,
  CheckCircle,
} from '@mui/icons-material';

const diseases = [
  {
    id: 1,
    name: 'Typhoid',
    image: 'https://source.unsplash.com/random/800x400/?typhoid',
    symptoms: ['High fever', 'Headache', 'Stomach pain', 'Loss of appetite'],
    severity: 'High',
    description: 'Typhoid fever is a bacterial infection that can spread throughout the body, affecting many organs. Without prompt treatment, it can cause serious complications and can be fatal.',
    treatments: [
      {
        name: 'Ciprofloxacin',
        description: 'Antibiotic medication to kill the bacteria',
        dosage: '500mg twice daily for 7-10 days',
        price: 15.99,
        image: 'https://source.unsplash.com/random/200x200/?medicine',
      },
      {
        name: 'Azithromycin',
        description: 'Alternative antibiotic treatment',
        dosage: '500mg once daily for 7 days',
        price: 12.99,
        image: 'https://source.unsplash.com/random/200x200/?pill',
      },
    ],
    precautions: [
      'Drink only bottled or boiled water',
      'Avoid raw fruits and vegetables',
      'Practice good hand hygiene',
      'Get vaccinated before traveling to high-risk areas',
    ],
  },
  // Add more diseases here...
];

const DiseaseDetail = () => {
  const { id } = useParams();
  const disease = diseases.find((d) => d.id === parseInt(id));

  if (!disease) {
    return (
      <Container>
        <Typography variant="h4" align="center">
          Disease not found
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Disease Header */}
        <Grid item xs={12}>
          <Card>
            <CardMedia
              component="img"
              height="400"
              image={disease.image}
              alt={disease.name}
            />
            <CardContent>
              <Typography variant="h3" component="h1" gutterBottom>
                {disease.name}
              </Typography>
              <Chip
                label={`Severity: ${disease.severity}`}
                color={disease.severity === 'High' ? 'error' : 'warning'}
                size="large"
                sx={{ mb: 2 }}
              />
              <Typography variant="body1" paragraph>
                {disease.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Symptoms */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                <Warning sx={{ mr: 1 }} />
                Symptoms
              </Typography>
              <List>
                {disease.symptoms.map((symptom, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <Warning color="warning" />
                    </ListItemIcon>
                    <ListItemText primary={symptom} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Precautions */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                <CheckCircle sx={{ mr: 1 }} />
                Precautions
              </Typography>
              <List>
                {disease.precautions.map((precaution, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <CheckCircle color="success" />
                    </ListItemIcon>
                    <ListItemText primary={precaution} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Treatments */}
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            <Healing sx={{ mr: 1 }} />
            Recommended Treatments
          </Typography>
          <Grid container spacing={3}>
            {disease.treatments.map((treatment, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardMedia
                    component="img"
                    height="200"
                    image={treatment.image}
                    alt={treatment.name}
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {treatment.name}
                    </Typography>
                    <Typography color="text.secondary" paragraph>
                      {treatment.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Dosage: {treatment.dosage}
                    </Typography>
                    <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
                      ${treatment.price}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      sx={{ mt: 2 }}
                    >
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DiseaseDetail; 