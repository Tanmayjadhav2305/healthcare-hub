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
import { useCart } from '../context/CartContext';

const mockMedicine = {
  id: 1,
  name: 'Ciprofloxacin',
  description: 'Ciprofloxacin is an antibiotic that belongs to the fluoroquinolone class. It works by stopping the growth of bacteria.',
  price: 15.99,
  image: 'https://via.placeholder.com/300',
  manufacturer: 'PharmaCorp Inc.',
  dosage: '500mg',
  form: 'Tablets',
  usage: 'Take 1 tablet twice daily with or without food',
  sideEffects: [
    'Nausea',
    'Diarrhea',
    'Headache',
    'Dizziness',
    'Trouble sleeping'
  ],
  precautions: [
    'Take with plenty of water',
    'Avoid dairy products within 2 hours',
    'Complete the full course of treatment',
    'Avoid exposure to sunlight',
    'Inform your doctor if pregnant or breastfeeding'
  ],
  availability: 'In Stock',
  prescriptionRequired: true,
  reviews: [
    {
      id: 1,
      user: 'John Doe',
      rating: 5,
      comment: 'Very effective for my infection. Followed the instructions and felt better within a few days.',
    },
    {
      id: 2,
      user: 'Jane Smith',
      rating: 4,
      comment: 'Good medication but had some mild side effects. Would recommend.',
    },
  ],
};

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
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const handleAddToCart = () => {
    addToCart({ ...mockMedicine, quantity });
    setShowSuccess(true);
    navigate('/cart');
  };

  const handleShare = () => {
    setShareDialogOpen(true);
    // In a real app, implement actual sharing functionality
  };

  const handleAddReview = () => {
    // In a real app, implement review submission
    setReviewDialogOpen(false);
    setNewReview({ rating: 5, comment: '' });
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    // Here you would typically submit the review to your backend
    console.log('Submitting review:', { rating, review });
    setReview('');
    setRating(0);
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
              image={mockMedicine.image}
              alt={mockMedicine.name}
            />
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
              <IconButton onClick={() => setIsFavorite(!isFavorite)}>
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
                {mockMedicine.name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Rating
                  value={mockMedicine.reviews.length > 0 ? mockMedicine.reviews[0].rating : 0}
                  precision={0.5}
                  readOnly
                  emptyIcon={<StarBorderIcon />}
                  icon={<StarIcon />}
                  sx={{ mr: 1 }}
                />
                <Typography variant="body2" color="text.secondary">
                  ({mockMedicine.reviews.length} reviews)
                </Typography>
              </Box>
              <Typography variant="h5" color="primary" gutterBottom>
                ${mockMedicine.price.toFixed(2)}
              </Typography>
              <Typography variant="body1" paragraph>
                {mockMedicine.description}
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Chip
                  label={mockMedicine.availability}
                  color={mockMedicine.availability === 'In Stock' ? 'success' : 'error'}
                />
                {mockMedicine.prescriptionRequired && (
                  <Chip label="Prescription Required" color="warning" />
                )}
              </Box>
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <TextField
                  type="number"
                  label="Quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  inputProps={{ min: 1 }}
                  sx={{ width: 120 }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={<CartIcon />}
                  onClick={handleAddToCart}
                  fullWidth
                  disabled={mockMedicine.availability !== 'In Stock'}
                >
                  Add to Cart
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Usage Instructions */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Usage Instructions
              </Typography>
              <Typography variant="body1" paragraph>
                {mockMedicine.usage}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Side Effects */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Side Effects
              </Typography>
              <List>
                {mockMedicine.sideEffects.map((effect, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={effect} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Precautions */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Precautions
              </Typography>
              <List>
                {mockMedicine.precautions.map((precaution, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={precaution} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Reviews */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">
                  Reviews
                </Typography>
                <Button variant="outlined" onClick={() => setReviewDialogOpen(true)}>
                  Add Review
                </Button>
              </Box>
              <List>
                {mockMedicine.reviews.map((review) => (
                  <React.Fragment key={review.id}>
                    <ListItem>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="subtitle1">{review.user}</Typography>
                            <Box sx={{ display: 'flex', gap: 0.5 }}>
                              {[...Array(5)].map((_, i) => (
                                <Typography
                                  key={i}
                                  component="span"
                                  color={i < review.rating ? 'primary' : 'text.secondary'}
                                >
                                  ★
                                </Typography>
                              ))}
                            </Box>
                          </Box>
                        }
                        secondary={review.comment}
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
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
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Added to cart successfully!
        </Alert>
      </Snackbar>

      {/* Share Dialog */}
      <Dialog open={shareDialogOpen} onClose={() => setShareDialogOpen(false)}>
        <DialogTitle>Share Medicine</DialogTitle>
        <DialogContent>
          <Typography>
            Share this medicine information with others:
          </Typography>
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

      {/* Review Dialog */}
      <Dialog open={reviewDialogOpen} onClose={() => setReviewDialogOpen(false)}>
        <DialogTitle>Add Review</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Typography gutterBottom>Rating</Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <IconButton
                  key={star}
                  onClick={() => setNewReview({ ...newReview, rating: star })}
                >
                  <Typography
                    component="span"
                    color={star <= newReview.rating ? 'primary' : 'text.secondary'}
                  >
                    ★
                  </Typography>
                </IconButton>
              ))}
            </Box>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Your Review"
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setReviewDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleAddReview}
            disabled={!newReview.comment.trim()}
          >
            Submit Review
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default MedicineDetails; 