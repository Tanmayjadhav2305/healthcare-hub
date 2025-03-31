import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Chip,
  TextField,
  Snackbar,
  Alert,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Rating,
} from '@mui/material';
import {
  ShoppingCart as CartIcon,
  Share as ShareIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
} from '@mui/icons-material';
import { useCart } from '../contexts/CartContext';
import { medicines } from '../data/medicines';

const MedicineDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });

  // Find the medicine from medicines array
  const medicine = medicines.find(m => m.id === parseInt(id));

  if (!medicine) {
    return (
      <Container>
        <Typography variant="h5" color="error" sx={{ mt: 4 }}>
          Medicine not found
        </Typography>
      </Container>
    );
  }

  const handleAddToCart = () => {
    addToCart({ ...medicine, quantity });
    setShowSuccess(true);
  };

  const handleShare = () => {
    setShareDialogOpen(true);
  };

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Medicine Image */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              height="400"
              image={medicine.image}
              alt={medicine.name}
              sx={{ objectFit: 'cover' }}
            />
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
              <IconButton onClick={handleFavoriteToggle}>
                {isFavorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
              </IconButton>
              <IconButton onClick={handleShare}>
                <ShareIcon />
              </IconButton>
            </Box>
          </Card>
        </Grid>

        {/* Medicine Details */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                {medicine.name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Rating value={medicine.rating} precision={0.1} readOnly />
                <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                  ({medicine.reviews} reviews)
                </Typography>
              </Box>
              <Typography variant="h5" color="primary" gutterBottom>
                ${medicine.price}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <Chip
                  label={medicine.category}
                  color="primary"
                  variant="outlined"
                />
                <Chip
                  label={medicine.availability}
                  color={medicine.availability === 'In Stock' ? 'success' : 'error'}
                />
              </Box>
              <Typography variant="body1" paragraph>
                {medicine.description}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>
                Uses
              </Typography>
              <List>
                {medicine.uses.map((use, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={use} />
                  </ListItem>
                ))}
              </List>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>
                Side Effects
              </Typography>
              <Typography variant="body1" paragraph>
                {medicine.sideEffects}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>
                Instructions
              </Typography>
              <Typography variant="body1" paragraph>
                {medicine.instructions}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <TextField
                  type="number"
                  label="Quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  InputProps={{ inputProps: { min: 1 } }}
                />
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<CartIcon />}
                  onClick={handleAddToCart}
                  disabled={medicine.availability !== 'In Stock'}
                >
                  Add to Cart
                </Button>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Manufacturer: {medicine.manufacturer}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Storage: {medicine.storage}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Share Dialog */}
      <Dialog open={shareDialogOpen} onClose={() => setShareDialogOpen(false)}>
        <DialogTitle>Share Medicine</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Share this medicine with others:
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setShareDialogOpen(false);
              }}
            >
              Copy Link
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShareDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Success Message */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Added to cart successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default MedicineDetails; 