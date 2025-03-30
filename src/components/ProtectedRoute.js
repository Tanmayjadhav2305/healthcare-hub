import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, isDoctor, isPatient } = useAuth();
  const location = useLocation();

  if (!isAuthenticated()) {
    // Redirect to login page but save the attempted location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole === 'doctor' && !isDoctor()) {
    // Redirect to home if trying to access doctor routes as non-doctor
    return <Navigate to="/" replace />;
  }

  if (requiredRole === 'patient' && !isPatient()) {
    // Redirect to home if trying to access patient routes as non-patient
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute; 