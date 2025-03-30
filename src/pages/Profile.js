import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Alert,
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Work as WorkIcon,
  School as SchoolIcon,
  CalendarToday as CalendarIcon,
  MedicalServices as MedicalServicesIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // If no user is logged in, show registration prompt
  if (!user) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Card elevation={3}>
          <CardContent>
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h5" gutterBottom>
                Please Register First
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                You need to register or login to view your profile.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/register')}
                sx={{ mr: 2 }}
              >
                Register
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    );
  }

  // Mock data - in a real app, this would come from your backend
  const doctorProfile = {
    name: 'Dr. John Smith',
    email: user.email,
    phone: '+1 234 567 8900',
    location: 'New York, USA',
    specialization: 'Cardiologist',
    experience: '15 years',
    education: 'MD from Harvard Medical School',
    joinDate: 'January 2010',
    patients: 1500,
    rating: 4.8,
  };

  const patientProfile = {
    name: 'Sarah Johnson',
    email: user.email,
    phone: '+1 234 567 8901',
    location: 'Boston, USA',
    joinDate: 'March 2023',
    lastVisit: 'April 15, 2024',
    upcomingAppointments: 2,
    prescriptions: 5,
  };

  const profile = user.role === 'doctor' ? doctorProfile : patientProfile;

  const handleEditProfile = () => {
    navigate('/edit-profile');
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Card elevation={3}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  bgcolor: 'primary.main',
                  fontSize: '2.5rem',
                }}
              >
                {profile.name.charAt(0)}
              </Avatar>
              <Box>
                <Typography variant="h4" gutterBottom>
                  {profile.name}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {user.role === 'doctor' ? 'Medical Professional' : 'Patient'}
                </Typography>
              </Box>
            </Box>
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              onClick={handleEditProfile}
            >
              Edit Profile
            </Button>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Personal Information
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <EmailIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Email" secondary={profile.email} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <PhoneIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Phone" secondary={profile.phone} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <LocationIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Location" secondary={profile.location} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CalendarIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Member Since" secondary={profile.joinDate} />
                </ListItem>
              </List>
            </Grid>

            <Grid item xs={12} md={6}>
              {user.role === 'doctor' ? (
                <>
                  <Typography variant="h6" gutterBottom>
                    Professional Information
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <WorkIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Specialization" secondary={profile.specialization} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <MedicalServicesIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Experience" secondary={profile.experience} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <SchoolIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Education" secondary={profile.education} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <PersonIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Patients Treated" secondary={profile.patients} />
                    </ListItem>
                  </List>
                  <Box sx={{ mt: 2 }}>
                    <Chip
                      icon={<MedicalServicesIcon />}
                      label={`Rating: ${profile.rating}/5`}
                      color="primary"
                      variant="outlined"
                    />
                  </Box>
                </>
              ) : (
                <>
                  <Typography variant="h6" gutterBottom>
                    Medical Information
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <CalendarIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Last Visit" secondary={profile.lastVisit} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <MedicalServicesIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Upcoming Appointments" secondary={profile.upcomingAppointments} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <WorkIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Active Prescriptions" secondary={profile.prescriptions} />
                    </ListItem>
                  </List>
                </>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Profile; 