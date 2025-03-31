import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Container,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Tabs,
  Tab,
  Alert,
  IconButton,
  InputAdornment,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PersonIcon from '@mui/icons-material/Person';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setFormData({ email: '', password: '' });
    setError('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.email && formData.password) {
      // Here you would typically validate credentials with your backend
      // For demo purposes, we'll simulate a successful login
      const userRole = tabValue === 0 ? 'patient' : 'doctor';
      login({
        email: formData.email,
        role: userRole,
        name: 'Demo User',
      });

      // Navigate to the originally requested page or dashboard
      const from = location.state?.from?.pathname || `/${userRole}-dashboard`;
      navigate(from, { replace: true });
    } else {
      setError('Please fill in all fields');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Card elevation={3}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
              <LocalHospitalIcon sx={{ fontSize: 60, color: 'primary.main' }} />
            </Box>
            <Typography variant="h4" align="center" gutterBottom>
              Hospital Management System
            </Typography>
            <Typography variant="subtitle1" align="center" color="text.secondary" gutterBottom>
              {tabValue === 0 ? 'Patient Portal' : 'Doctor Portal'}
            </Typography>

            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              centered
              sx={{ mb: 3 }}
            >
              <Tab
                icon={<PersonIcon />}
                label="Patient Login"
                iconPosition="start"
              />
              <Tab
                icon={<LocalHospitalIcon />}
                label="Doctor Login"
                iconPosition="start"
              />
            </Tabs>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                margin="normal"
                required
                autoComplete="email"
              />
              <TextField
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleInputChange}
                margin="normal"
                required
                autoComplete="current-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{ mt: 3 }}
              >
                {tabValue === 0 ? 'Login as Patient' : 'Login as Doctor'}
              </Button>
            </form>

            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                {tabValue === 0 ? (
                  <>
                    Don't have an account?{' '}
                    <Button
                      color="primary"
                      onClick={() => navigate('/register')}
                      sx={{ textTransform: 'none' }}
                    >
                      Register as Patient
                    </Button>
                  </>
                ) : (
                  <>
                    Are you a patient?{' '}
                    <Button
                      color="primary"
                      onClick={() => setTabValue(0)}
                      sx={{ textTransform: 'none' }}
                    >
                      Login as Patient
                    </Button>
                  </>
                )}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Login; 