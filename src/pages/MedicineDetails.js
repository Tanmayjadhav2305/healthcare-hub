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
import { mockMedicines } from '../data/medicines';

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

  // Find the medicine from mockMedicines array
  const medicine = mockMedicines.find(m => m.id === parseInt(id));

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
                <Rating
                  value={medicine.rating}
                  precision={0.5}
                  readOnly
                  emptyIcon={<StarBorderIcon />}
                  icon={<StarIcon />}
                  sx={{ mr: 1 }}
                />
                <Typography variant="body2" color="text.secondary">
                  ({medicine.reviews} reviews)
                </Typography>
              </Box>
              <Typography variant="h5" color="primary" gutterBottom>
                ${medicine.price.toFixed(2)}
              </Typography>
              <Typography variant="body1" paragraph>
                {medicine.description}
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Chip
                  label={medicine.availability}
                  color={medicine.availability === 'In Stock' ? 'success' : 'error'}
                  sx={{ mr: 1 }}
                />
                {medicine.prescriptionRequired && (
                  <Chip label="Prescription Required" color="warning" />
                )}
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Manufacturer
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {medicine.manufacturer}
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Dosage
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {medicine.dosage}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <TextField
                  type="number"
                  label="Quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  inputProps={{ min: 1 }}
                  sx={{ width: 100 }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={<CartIcon />}
                  onClick={handleAddToCart}
                  disabled={medicine.availability !== 'In Stock'}
                  fullWidth
                >
                  Add to Cart
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Additional Information */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
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
              <List>
                {medicine.sideEffects.map((effect, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={effect} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Success Snackbar */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={() => setShowSuccess(false)} severity="success">
          Added to cart successfully!
        </Alert>
      </Snackbar>

      {/* Share Dialog */}
      <Dialog open={shareDialogOpen} onClose={() => setShareDialogOpen(false)}>
        <DialogTitle>Share Medicine</DialogTitle>
        <DialogContent>
          <Typography>Share this medicine information with others:</Typography>
          <Box sx={{ mt: 2 }}>
            <Button
              variant="outlined"
              fullWidth
              sx={{ mb: 1 }}
              onClick={() => {
                // Implement social sharing
                setShareDialogOpen(false);
              }}
            >
              Share on Facebook
            </Button>
            <Button
              variant="outlined"
              fullWidth
              sx={{ mb: 1 }}
              onClick={() => {
                // Implement social sharing
                setShareDialogOpen(false);
              }}
            >
              Share on Twitter
            </Button>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => {
                // Implement copy link
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
    </Container>
  );
};

export default MedicineDetails; 