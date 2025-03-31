import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [lastActivity, setLastActivity] = useState(Date.now());

  // Check session timeout
  useEffect(() => {
    const checkSession = () => {
      if (user && Date.now() - lastActivity > process.env.REACT_APP_SESSION_TIMEOUT * 1000) {
        logout();
      }
    };

    const interval = setInterval(checkSession, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [user, lastActivity]);

  // Update last activity on user interaction
  useEffect(() => {
    const updateActivity = () => setLastActivity(Date.now());
    window.addEventListener('mousemove', updateActivity);
    window.addEventListener('keypress', updateActivity);
    return () => {
      window.removeEventListener('mousemove', updateActivity);
      window.removeEventListener('keypress', updateActivity);
    };
  }, []);

  // Check if domain is allowed
  const isAllowedDomain = () => {
    const allowedDomains = process.env.REACT_APP_ALLOWED_DOMAINS.split(',');
    const currentDomain = window.location.hostname;
    return allowedDomains.includes(currentDomain);
  };

  // Check if IP is allowed (if enabled)
  const isAllowedIP = async () => {
    if (!process.env.REACT_APP_ENABLE_IP_RESTRICTION) return true;
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      // Add your IP validation logic here
      return true; // Replace with actual IP validation
    } catch (error) {
      console.error('IP check failed:', error);
      return false;
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Check login attempts
      if (loginAttempts >= process.env.REACT_APP_MAX_LOGIN_ATTEMPTS) {
        throw new Error('Too many login attempts. Please try again later.');
      }

      // Here you would typically make an API call to your backend
      const mockUser = {
        id: 1,
        email,
        name: 'John Doe',
        role: 'patient',
        lastLogin: new Date().toISOString(),
      };

      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      setLoginAttempts(0);
      setLastActivity(Date.now());
      return mockUser;
    } catch (error) {
      setLoginAttempts(prev => prev + 1);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const mockUser = {
        id: 1,
        ...userData,
        lastLogin: new Date().toISOString(),
      };

      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      setLastActivity(Date.now());
      return mockUser;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      setUser(null);
      localStorage.removeItem('user');
      setLoginAttempts(0);
    } catch (error) {
      throw new Error('Logout failed');
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: () => !!user,
    isDoctor: () => user?.role === 'doctor',
    isPatient: () => user?.role === 'patient',
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}; 