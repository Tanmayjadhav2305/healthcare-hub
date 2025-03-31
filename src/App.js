import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MedicineCatalog from './pages/MedicineCatalog';
import MedicineDetails from './pages/MedicineDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import DoctorDashboard from './pages/DoctorDashboard';
import PatientDashboard from './pages/PatientDashboard';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import Diseases from './pages/Diseases';
import PrescriptionUpload from './components/PrescriptionUpload';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './pages/Dashboard';
import DiseaseDetails from './pages/DiseaseDetails';
import HealthMonitoring from './pages/HealthMonitoring';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <CartProvider>
          <Router>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              <Navbar />
              <main style={{ flex: 1 }}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/medicines" element={<MedicineCatalog />} />
                  <Route path="/medicines/:id" element={<MedicineDetails />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/diseases" element={<Diseases />} />
                  <Route path="/diseases/:id" element={<DiseaseDetails />} />
                  <Route path="/health-monitoring" element={<HealthMonitoring />} />
                  <Route
                    path="/doctor-dashboard"
                    element={
                      <PrivateRoute role="doctor">
                        <DoctorDashboard />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/patient-dashboard"
                    element={
                      <PrivateRoute role="patient">
                        <PatientDashboard />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <PrivateRoute>
                        <Profile />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/edit-profile"
                    element={
                      <PrivateRoute>
                        <EditProfile />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/upload-prescription"
                    element={
                      <PrivateRoute>
                        <PrescriptionUpload />
                      </PrivateRoute>
                    }
                  />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
