import React, { useState } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Button,
  Box,
  TextField,
  Divider,
  CardMedia,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  ShoppingCart as CartIcon,
} from '@mui/icons-material';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getTotal } = useCart();
  const navigate = useNavigate();
  const [shippingAddress, setShippingAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const handleQuantityChange = (id, change) => {
    const item = cart.find(item => item.id === id);
    if (item) {
      const newQuantity = Math.max(1, item.quantity + change);
      updateQuantity(id, newQuantity);
    }
  };

  const handleRemoveItem = (id) => {
    removeFromCart(id);
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckout = () => {
    // Here you would typically integrate with a payment gateway
    alert('Order placed successfully!');
    navigate('/');
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Shopping Cart
      </Typography>

      <Grid container spacing={4}>
        {/* Cart Items */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              {cart.length === 0 ? (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    py: 4,
                  }}
                >
                  <CartIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary">
                    Your cart is empty
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate('/medicines')}
                    sx={{ mt: 2 }}
                  >
                    Continue Shopping
                  </Button>
                </Box>
              ) : (
                <List>
                  {cart.map((item) => (
                    <React.Fragment key={item.id}>
                      <ListItem>
                        <CardMedia
                          component="img"
                          image={item.image}
                          alt={item.name}
                          sx={{ width: 100, height: 100, objectFit: 'cover', mr: 2 }}
                        />
                        <ListItemText
                          primary={item.name}
                          secondary={`$${item.price.toFixed(2)}`}
                        />
                        <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                          <IconButton
                            size="small"
                            onClick={() => handleQuantityChange(item.id, -1)}
                          >
                            <RemoveIcon />
                          </IconButton>
                          <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
                          <IconButton
                            size="small"
                            onClick={() => handleQuantityChange(item.id, 1)}
                          >
                            <AddIcon />
                          </IconButton>
                        </Box>
                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => handleRemoveItem(item.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Order Summary */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>
              <Box sx={{ my: 2 }}>
                <Typography variant="body1">
                  Subtotal: ${getTotal().toFixed(2)}
                </Typography>
                <Typography variant="body1">
                  Shipping: $5.00
                </Typography>
                <Typography variant="h6" sx={{ mt: 1 }}>
                  Total: ${(getTotal() + 5).toFixed(2)}
                </Typography>
              </Box>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleCheckout}
                disabled={cart.length === 0}
              >
                Proceed to Checkout
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart; 