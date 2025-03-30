import React from 'react';
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Divider,
} from '@mui/material';
import {
  LocalHospital,
  ShoppingCart,
  History,
  Person,
  CalendarToday,
} from '@mui/icons-material';

const PatientDashboard = () => {
  // Mock data for demonstration
  const patientInfo = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900',
    age: 35,
    bloodGroup: 'A+',
  };

  const recentOrders = [
    {
      id: 1,
      date: '2024-03-15',
      items: ['Ciprofloxacin', 'Paracetamol'],
      total: 45.98,
      status: 'Delivered',
    },
    {
      id: 2,
      date: '2024-03-10',
      items: ['Azithromycin', 'Vitamin C'],
      total: 32.99,
      status: 'In Transit',
    },
  ];

  const medicalHistory = [
    {
      date: '2024-03-01',
      condition: 'Typhoid',
      doctor: 'Dr. Sarah Wilson',
      status: 'Recovered',
    },
    {
      date: '2024-02-15',
      condition: 'Common Cold',
      doctor: 'Dr. Michael Brown',
      status: 'Recovered',
    },
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'success';
      case 'in transit':
        return 'warning';
      case 'recovered':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Patient Dashboard
      </Typography>

      {/* Patient Information */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Person sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
            <Typography variant="h5">Personal Information</Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Name
              </Typography>
              <Typography variant="body1">{patientInfo.name}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Email
              </Typography>
              <Typography variant="body1">{patientInfo.email}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Phone
              </Typography>
              <Typography variant="body1">{patientInfo.phone}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Blood Group
              </Typography>
              <Typography variant="body1">{patientInfo.bloodGroup}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Grid container spacing={4}>
        {/* Recent Orders */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ShoppingCart sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
                <Typography variant="h5">Recent Orders</Typography>
              </Box>
              <List>
                {recentOrders.map((order, index) => (
                  <React.Fragment key={order.id}>
                    <ListItem>
                      <ListItemIcon>
                        <CalendarToday color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary={`Order #${order.id}`}
                        secondary={
                          <>
                            <Typography component="span" variant="body2">
                              {order.date}
                            </Typography>
                            <br />
                            <Typography component="span" variant="body2">
                              Items: {order.items.join(', ')}
                            </Typography>
                            <br />
                            <Typography component="span" variant="body2">
                              Total: ${order.total}
                            </Typography>
                          </>
                        }
                      />
                      <Chip
                        label={order.status}
                        color={getStatusColor(order.status)}
                        size="small"
                      />
                    </ListItem>
                    {index < recentOrders.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Medical History */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <History sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
                <Typography variant="h5">Medical History</Typography>
              </Box>
              <List>
                {medicalHistory.map((record, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemIcon>
                        <LocalHospital color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary={record.condition}
                        secondary={
                          <>
                            <Typography component="span" variant="body2">
                              Date: {record.date}
                            </Typography>
                            <br />
                            <Typography component="span" variant="body2">
                              Doctor: {record.doctor}
                            </Typography>
                          </>
                        }
                      />
                      <Chip
                        label={record.status}
                        color={getStatusColor(record.status)}
                        size="small"
                      />
                    </ListItem>
                    {index < medicalHistory.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PatientDashboard; 