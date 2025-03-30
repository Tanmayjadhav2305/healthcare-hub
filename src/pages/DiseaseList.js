import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  Box,
  Chip,
  Button,
} from '@mui/material';

const diseases = [
  {
    id: 1,
    name: 'Typhoid',
    image: 'https://source.unsplash.com/random/400x300/?typhoid',
    symptoms: ['High fever', 'Headache', 'Stomach pain', 'Loss of appetite'],
    severity: 'High',
  },
  {
    id: 2,
    name: 'Malaria',
    image: 'https://source.unsplash.com/random/400x300/?malaria',
    symptoms: ['Fever', 'Chills', 'Headache', 'Muscle pain'],
    severity: 'High',
  },
  {
    id: 3,
    name: 'Common Cold',
    image: 'https://source.unsplash.com/random/400x300/?cold',
    symptoms: ['Runny nose', 'Sore throat', 'Cough', 'Congestion'],
    severity: 'Low',
  },
  {
    id: 4,
    name: 'Cough',
    image: 'https://source.unsplash.com/random/400x300/?cough',
    symptoms: ['Persistent cough', 'Chest congestion', 'Shortness of breath'],
    severity: 'Medium',
  },
  {
    id: 5,
    name: 'Weakness',
    image: 'https://source.unsplash.com/random/400x300/?weakness',
    symptoms: ['Fatigue', 'Lack of energy', 'Difficulty concentrating'],
    severity: 'Low',
  },
];

const DiseaseList = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDiseases = diseases.filter((disease) =>
    disease.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
        Available Diseases
      </Typography>

      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search diseases..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>

      <Grid container spacing={4}>
        {filteredDiseases.map((disease) => (
          <Grid item key={disease.id} xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={disease.image}
                alt={disease.name}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {disease.name}
                </Typography>
                <Chip
                  label={`Severity: ${disease.severity}`}
                  color={getSeverityColor(disease.severity)}
                  size="small"
                  sx={{ mb: 2 }}
                />
                <Typography variant="subtitle1" gutterBottom>
                  Symptoms:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {disease.symptoms.map((symptom, index) => (
                    <Chip
                      key={index}
                      label={symptom}
                      size="small"
                      variant="outlined"
                    />
                  ))}
                </Box>
              </CardContent>
              <Box sx={{ p: 2, textAlign: 'center' }}>
                <Button
                  component={RouterLink}
                  to={`/disease/${disease.id}`}
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  View Details
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default DiseaseList; 