import React, { useState } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Button,
  Box,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Tabs,
  Tab,
  TextField,
  Grid,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  MedicalServices as MedicalIcon,
  Chat as ChatIcon,
  CheckCircle as CheckCircleIcon,
  AccessTime as TimeIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

const healthQuestions = [
  {
    id: 1,
    question: 'Do you have a cold or flu-like symptoms?',
    options: [
      { value: 'yes', label: 'Yes, severe symptoms' },
      { value: 'mild', label: 'Yes, mild symptoms' },
      { value: 'no', label: 'No symptoms' },
      { value: 'recovering', label: 'Recovering from cold' },
    ],
  },
  {
    id: 2,
    question: 'Are you experiencing any weakness or fatigue?',
    options: [
      { value: 'severe', label: 'Severe weakness' },
      { value: 'moderate', label: 'Moderate weakness' },
      { value: 'mild', label: 'Mild weakness' },
      { value: 'none', label: 'No weakness' },
    ],
  },
  {
    id: 3,
    question: 'Do you have any fever?',
    options: [
      { value: 'high', label: 'High fever (>38°C)' },
      { value: 'mild', label: 'Mild fever (37.5-38°C)' },
      { value: 'low', label: 'Low-grade fever (37-37.5°C)' },
      { value: 'no', label: 'No fever' },
    ],
  },
  {
    id: 4,
    question: 'Are you experiencing any breathing difficulties?',
    options: [
      { value: 'severe', label: 'Severe difficulty' },
      { value: 'moderate', label: 'Moderate difficulty' },
      { value: 'mild', label: 'Mild difficulty' },
      { value: 'none', label: 'No difficulty' },
    ],
  },
  {
    id: 5,
    question: 'Do you have any body aches or muscle pain?',
    options: [
      { value: 'severe', label: 'Severe pain' },
      { value: 'moderate', label: 'Moderate pain' },
      { value: 'mild', label: 'Mild pain' },
      { value: 'none', label: 'No pain' },
    ],
  },
  {
    id: 6,
    question: 'Are you experiencing any loss of appetite?',
    options: [
      { value: 'complete', label: 'Complete loss of appetite' },
      { value: 'partial', label: 'Partial loss of appetite' },
      { value: 'slight', label: 'Slightly reduced appetite' },
      { value: 'normal', label: 'Normal appetite' },
    ],
  },
];

const consultationDetails = {
  doctors: [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialization: 'General Physician',
      experience: '15 years',
      availability: 'Mon-Fri, 9:00 AM - 5:00 PM',
      fee: '$50',
      rating: 4.8,
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialization: 'Internal Medicine',
      experience: '12 years',
      availability: 'Mon-Sat, 10:00 AM - 6:00 PM',
      fee: '$60',
      rating: 4.9,
    },
    {
      id: 3,
      name: 'Dr. Emily Brown',
      specialization: 'Family Medicine',
      experience: '10 years',
      availability: 'Mon-Thu, 11:00 AM - 7:00 PM',
      fee: '$45',
      rating: 4.7,
    },
  ],
  consultationTypes: [
    {
      type: 'Video Consultation',
      duration: '15-20 minutes',
      price: '$30',
      description: 'Online video call with doctor',
    },
    {
      type: 'In-Person Consultation',
      duration: '20-30 minutes',
      price: '$50',
      description: 'Physical visit to clinic',
    },
    {
      type: 'Follow-up Consultation',
      duration: '10-15 minutes',
      price: '$25',
      description: 'Follow-up visit or call',
    },
  ],
};

const HealthMonitoring = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [tabValue, setTabValue] = useState(0);
  const [showConsultationForm, setShowConsultationForm] = useState(false);
  const [showDirectConsultDialog, setShowDirectConsultDialog] = useState(false);
  const [consultationForm, setConsultationForm] = useState({
    name: '',
    email: '',
    phone: '',
    symptoms: '',
    preferredTime: '',
    doctorId: '',
    consultationType: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleNext = () => {
    if (activeStep === healthQuestions.length - 1) {
      handleSubmit();
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = () => {
    console.log('Questionnaire answers:', answers);
    alert('Health monitoring questionnaire submitted successfully!');
    navigate('/dashboard');
  };

  const validateForm = () => {
    const errors = {};
    if (!consultationForm.name) errors.name = 'Name is required';
    if (!consultationForm.email) errors.email = 'Email is required';
    if (!consultationForm.phone) errors.phone = 'Phone number is required';
    if (!consultationForm.symptoms) errors.symptoms = 'Symptoms description is required';
    if (!consultationForm.preferredTime) errors.preferredTime = 'Preferred time is required';
    if (!consultationForm.doctorId) errors.doctorId = 'Please select a doctor';
    if (!consultationForm.consultationType) errors.consultationType = 'Please select consultation type';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleConsultationSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setShowSuccessMessage(true);
      setShowConsultationForm(false);
      // Reset form after successful submission
      setConsultationForm({
        name: '',
        email: '',
        phone: '',
        symptoms: '',
        preferredTime: '',
        doctorId: '',
        consultationType: '',
      });
    }
  };

  const handleConsultationChange = (e) => {
    const { name, value } = e.target;
    setConsultationForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleConsultNow = () => {
    if (!user) {
      navigate('/login', { state: { from: '/health-monitoring' } });
      return;
    }
    setShowConsultationForm(true);
  };

  const handleDirectConsult = () => {
    if (!user) {
      navigate('/login', { state: { from: '/health-monitoring' } });
      return;
    }
    setShowDirectConsultDialog(true);
  };

  const currentQuestion = healthQuestions[activeStep];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Health Monitoring & Consultation
      </Typography>

      <Paper sx={{ mb: 4 }}>
        <Tabs
          value={tabValue}
          onChange={(e, newValue) => setTabValue(newValue)}
          centered
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab
            icon={<MedicalIcon />}
            label="Health Questionnaire"
            iconPosition="start"
          />
          <Tab
            icon={<ChatIcon />}
            label="Consult Doctor"
            iconPosition="start"
          />
        </Tabs>
      </Paper>

      {tabValue === 0 ? (
        <>
          <Paper sx={{ p: 3, mb: 4 }}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {healthQuestions.map((_, index) => (
                <Step key={index}>
                  <StepLabel>Question {index + 1}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Paper>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {currentQuestion.question}
              </Typography>

              <FormControl component="fieldset" sx={{ mt: 2 }}>
                <RadioGroup
                  value={answers[currentQuestion.id] || ''}
                  onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                >
                  {currentQuestion.options.map((option) => (
                    <FormControlLabel
                      key={option.value}
                      value={option.value}
                      control={<Radio />}
                      label={option.label}
                      sx={{ mb: 1 }}
                    />
                  ))}
                </RadioGroup>
              </FormControl>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                <Button
                  variant="outlined"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  disabled={!answers[currentQuestion.id]}
                >
                  {activeStep === healthQuestions.length - 1 ? 'Submit' : 'Next'}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </>
      ) : (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Schedule a Consultation
            </Typography>
            <Alert severity="info" sx={{ mb: 3 }}>
              Fill out the form below to schedule a consultation with our doctors. We'll contact you within 24 hours.
            </Alert>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleConsultNow}
              sx={{ mb: 3 }}
            >
              Book Consultation Now
            </Button>

            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
              Available Doctors
            </Typography>
            <Grid container spacing={3}>
              {consultationDetails.doctors.map((doctor) => (
                <Grid item xs={12} md={4} key={doctor.id}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">{doctor.name}</Typography>
                      <Typography color="textSecondary" gutterBottom>
                        {doctor.specialization}
                      </Typography>
                      <Typography variant="body2">
                        Experience: {doctor.experience}
                      </Typography>
                      <Typography variant="body2">
                        Availability: {doctor.availability}
                      </Typography>
                      <Typography variant="body2" color="primary">
                        Consultation Fee: {doctor.fee}
                      </Typography>
                      <Typography variant="body2">
                        Rating: {doctor.rating}/5
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      )}

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={8}>
              <Typography variant="h5" gutterBottom>
                Book An Appointment Doctor Consult
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Consultation on chat or call available 24/7
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} sx={{ textAlign: { md: 'right' } }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleDirectConsult}
                startIcon={<ChatIcon />}
              >
                Consult Now
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Dialog
        open={showConsultationForm}
        onClose={() => setShowConsultationForm(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Book a Consultation</DialogTitle>
        <DialogContent>
          <form onSubmit={handleConsultationSubmit}>
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="name"
                  value={consultationForm.name}
                  onChange={handleConsultationChange}
                  error={!!formErrors.name}
                  helperText={formErrors.name}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={consultationForm.email}
                  onChange={handleConsultationChange}
                  error={!!formErrors.email}
                  helperText={formErrors.email}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  value={consultationForm.phone}
                  onChange={handleConsultationChange}
                  error={!!formErrors.phone}
                  helperText={formErrors.phone}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Preferred Consultation Time"
                  name="preferredTime"
                  value={consultationForm.preferredTime}
                  onChange={handleConsultationChange}
                  error={!!formErrors.preferredTime}
                  helperText={formErrors.preferredTime}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!formErrors.doctorId}>
                  <Select
                    name="doctorId"
                    value={consultationForm.doctorId}
                    onChange={handleConsultationChange}
                    displayEmpty
                    required
                  >
                    <MenuItem value="" disabled>
                      Select Doctor
                    </MenuItem>
                    {consultationDetails.doctors.map((doctor) => (
                      <MenuItem key={doctor.id} value={doctor.id}>
                        {doctor.name} - {doctor.specialization}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{formErrors.doctorId}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!formErrors.consultationType}>
                  <Select
                    name="consultationType"
                    value={consultationForm.consultationType}
                    onChange={handleConsultationChange}
                    displayEmpty
                    required
                  >
                    <MenuItem value="" disabled>
                      Select Consultation Type
                    </MenuItem>
                    {consultationDetails.consultationTypes.map((type) => (
                      <MenuItem key={type.type} value={type.type}>
                        {type.type} - {type.price}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{formErrors.consultationType}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Describe your symptoms"
                  name="symptoms"
                  value={consultationForm.symptoms}
                  onChange={handleConsultationChange}
                  error={!!formErrors.symptoms}
                  helperText={formErrors.symptoms}
                  required
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowConsultationForm(false)}>Cancel</Button>
          <Button onClick={handleConsultationSubmit} variant="contained" color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={showSuccessMessage}
        onClose={() => setShowSuccessMessage(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Consultation Request Submitted</DialogTitle>
        <DialogContent>
          <Typography>
            Thank you for your consultation request. Our team will contact you within 24 hours to confirm your appointment.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowSuccessMessage(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={showDirectConsultDialog}
        onClose={() => setShowDirectConsultDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>24/7 Direct Consultation</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            Choose your preferred consultation method:
          </Typography>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Video Consultation
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Connect with a doctor instantly through video call
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => {
                      setShowDirectConsultDialog(false);
                      setShowConsultationForm(true);
                      setConsultationForm(prev => ({
                        ...prev,
                        consultationType: 'Video Consultation'
                      }));
                    }}
                  >
                    Start Video Call
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Chat Consultation
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Chat with a doctor for immediate medical advice
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => {
                      setShowDirectConsultDialog(false);
                      setShowConsultationForm(true);
                      setConsultationForm(prev => ({
                        ...prev,
                        consultationType: 'Chat Consultation'
                      }));
                    }}
                  >
                    Start Chat
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDirectConsultDialog(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>

      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        Note: This information is for monitoring purposes only. Please consult a healthcare professional for medical advice.
      </Typography>
    </Container>
  );
};

export default HealthMonitoring; 