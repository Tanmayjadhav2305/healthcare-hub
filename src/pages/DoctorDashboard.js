import React, { useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Chip,
  Avatar,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  LocalHospital,
  People as PeopleIcon,
  Event as EventIcon,
  MedicalServices as MedicalServicesIcon,
  Assessment as AssessmentIcon,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const DoctorDashboard = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [diseases, setDiseases] = useState([
    {
      id: 1,
      name: 'Typhoid',
      symptoms: ['High fever', 'Headache', 'Stomach pain'],
      treatments: ['Ciprofloxacin', 'Azithromycin'],
    },
    {
      id: 2,
      name: 'Malaria',
      symptoms: ['Fever', 'Chills', 'Headache'],
      treatments: ['Artemether', 'Quinine'],
    },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    symptoms: '',
    treatments: '',
  });

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData({ name: '', symptoms: '', treatments: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const newDisease = {
      id: diseases.length + 1,
      name: formData.name,
      symptoms: formData.symptoms.split(',').map((s) => s.trim()),
      treatments: formData.treatments.split(',').map((t) => t.trim()),
    };
    setDiseases([...diseases, newDisease]);
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    setDiseases(diseases.filter((disease) => disease.id !== id));
  };

  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Doctor Dashboard
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
        >
          Add New Disease
        </Button>
      </Box>

      <Grid container spacing={3}>
        {diseases.map((disease) => (
          <Grid item xs={12} md={6} key={disease.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6" component="h2">
                    {disease.name}
                  </Typography>
                  <Box>
                    <IconButton color="primary" size="small">
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      size="small"
                      onClick={() => handleDelete(disease.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>

                <Typography variant="subtitle1" gutterBottom>
                  Symptoms:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  {disease.symptoms.map((symptom, index) => (
                    <Chip
                      key={index}
                      label={symptom}
                      color="warning"
                      size="small"
                    />
                  ))}
                </Box>

                <Typography variant="subtitle1" gutterBottom>
                  Treatments:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {disease.treatments.map((treatment, index) => (
                    <Chip
                      key={index}
                      label={treatment}
                      color="success"
                      size="small"
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add New Disease</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Disease Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Symptoms (comma-separated)"
              name="symptoms"
              value={formData.symptoms}
              onChange={handleInputChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Treatments (comma-separated)"
              name="treatments"
              value={formData.treatments}
              onChange={handleInputChange}
              margin="normal"
              required
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Add Disease
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default DoctorDashboard; 