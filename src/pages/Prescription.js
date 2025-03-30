import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const mockMedicines = [
  { id: 1, name: 'Ciprofloxacin', dosage: '500mg' },
  { id: 2, name: 'Paracetamol', dosage: '500mg' },
  { id: 3, name: 'Amoxicillin', dosage: '250mg' },
];

const Prescription = () => {
  const [patientName, setPatientName] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [prescribedMedicines, setPrescribedMedicines] = useState([]);
  const [instructions, setInstructions] = useState('');

  const handleAddMedicine = (medicine) => {
    setPrescribedMedicines([
      ...prescribedMedicines,
      {
        ...medicine,
        quantity: 1,
        duration: '',
        frequency: '',
      },
    ]);
  };

  const handleRemoveMedicine = (index) => {
    const newMedicines = prescribedMedicines.filter((_, i) => i !== index);
    setPrescribedMedicines(newMedicines);
  };

  const handleMedicineChange = (index, field, value) => {
    const newMedicines = [...prescribedMedicines];
    newMedicines[index] = {
      ...newMedicines[index],
      [field]: value,
    };
    setPrescribedMedicines(newMedicines);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement prescription submission
    console.log('Prescription submitted:', {
      patientName,
      diagnosis,
      prescribedMedicines,
      instructions,
    });
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Write Prescription
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Patient Name"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Diagnosis"
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                required
                multiline
                rows={2}
              />
            </Grid>

            {/* Available Medicines */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Available Medicines
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {mockMedicines.map((medicine) => (
                  <Button
                    key={medicine.id}
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={() => handleAddMedicine(medicine)}
                  >
                    {medicine.name} ({medicine.dosage})
                  </Button>
                ))}
              </Box>
            </Grid>

            {/* Prescribed Medicines */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Prescribed Medicines
              </Typography>
              <List>
                {prescribedMedicines.map((medicine, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemText
                        primary={`${medicine.name} (${medicine.dosage})`}
                        secondary={
                          <Grid container spacing={2}>
                            <Grid item xs={12} sm={4}>
                              <TextField
                                fullWidth
                                label="Quantity"
                                type="number"
                                value={medicine.quantity}
                                onChange={(e) =>
                                  handleMedicineChange(index, 'quantity', e.target.value)
                                }
                              />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                              <TextField
                                fullWidth
                                label="Duration (days)"
                                type="number"
                                value={medicine.duration}
                                onChange={(e) =>
                                  handleMedicineChange(index, 'duration', e.target.value)
                                }
                              />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                              <TextField
                                fullWidth
                                label="Frequency"
                                placeholder="e.g., Twice daily"
                                value={medicine.frequency}
                                onChange={(e) =>
                                  handleMedicineChange(index, 'frequency', e.target.value)
                                }
                              />
                            </Grid>
                          </Grid>
                        }
                      />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => handleRemoveMedicine(index)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Additional Instructions"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                multiline
                rows={3}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
              >
                Submit Prescription
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Prescription; 