import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  TextField,
  Box,
  Chip,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  Rating,
  Divider,
  Tooltip,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
} from '@mui/icons-material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useCart } from '../contexts/CartContext';
import { mockMedicines, categories } from '../data/medicines';

const MedicineCatalog = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [sortBy, setSortBy] = useState('name');
  const [searchType, setSearchType] = useState('medicine');
  const [tabValue, setTabValue] = useState(0);
  const [medicines, setMedicines] = useState(mockMedicines);

  const filteredMedicines = medicines.filter((medicine) => {
    const matchesSearch = searchType === 'medicine'
      ? medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        medicine.description.toLowerCase().includes(searchQuery.toLowerCase())
      : medicine.uses.some(use => use.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || medicine.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedMedicines = [...filteredMedicines].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'name':
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const handleMedicineClick = (medicineId) => {
    navigate(`/medicines/${medicineId}`);
  };

  const handleAddToCart = (medicine) => {
    addToCart(medicine);
  };

  const handleFavoriteToggle = (medicineId, e) => {
    e.stopPropagation();
    setMedicines(prevMedicines => 
      prevMedicines.map(medicine => 
        medicine.id === medicineId 
          ? { ...medicine, isFavorite: !medicine.isFavorite }
          : medicine
      )
    );
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setSearchType(newValue === 0 ? 'medicine' : 'disease');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Search and Filter Section */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              sx={{ mb: 2 }}
            >
              <Tab label="Search by Medicine Name" />
              <Tab label="Search by Disease/Condition" />
            </Tabs>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder={searchType === 'medicine' ? "Search medicines..." : "Search by disease or condition..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="outlined"
                startIcon={<FilterIcon />}
                onClick={() => setFilterDialogOpen(true)}
              >
                Filters
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Medicine Grid */}
      <Grid container spacing={4}>
        {sortedMedicines.map((medicine) => (
          <Grid item key={medicine.id} xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                '&:hover': {
                  boxShadow: 6,
                },
              }}
              onClick={() => handleMedicineClick(medicine.id)}
            >
              <Box sx={{ position: 'relative' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={medicine.image}
                  alt={medicine.name}
                  sx={{
                    objectFit: 'cover',
                    backgroundColor: 'grey.100',
                    minHeight: '200px',
                    display: 'block',
                    width: '100%',
                  }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://img.freepik.com/free-photo/medical-bills-healthcare-insurance-concept_23-2149151355.jpg';
                  }}
                />
                <IconButton
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    },
                  }}
                  onClick={(e) => handleFavoriteToggle(medicine.id, e)}
                >
                  {medicine.isFavorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
                </IconButton>
              </Box>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="h2">
                  {medicine.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {medicine.description}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Rating value={medicine.rating} precision={0.5} readOnly size="small" />
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                    ({medicine.reviews})
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="h6" color="primary">
                    ${medicine.price}
                  </Typography>
                  <Chip
                    label={medicine.availability}
                    color={medicine.availability === 'In Stock' ? 'success' : 'error'}
                    size="small"
                  />
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(medicine);
                  }}
                  disabled={medicine.availability !== 'In Stock'}
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Filter Dialog */}
      <Dialog open={filterDialogOpen} onClose={() => setFilterDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Filter Medicines</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Category
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {categories.map((category) => (
                <Chip
                  key={category}
                  label={category}
                  onClick={() => setSelectedCategory(category)}
                  color={selectedCategory === category ? 'primary' : 'default'}
                />
              ))}
            </Box>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" gutterBottom>
              Sort By
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              <Chip
                label="Name"
                onClick={() => setSortBy('name')}
                color={sortBy === 'name' ? 'primary' : 'default'}
              />
              <Chip
                label="Price: Low to High"
                onClick={() => setSortBy('price-asc')}
                color={sortBy === 'price-asc' ? 'primary' : 'default'}
              />
              <Chip
                label="Price: High to Low"
                onClick={() => setSortBy('price-desc')}
                color={sortBy === 'price-desc' ? 'primary' : 'default'}
              />
              <Chip
                label="Rating"
                onClick={() => setSortBy('rating')}
                color={sortBy === 'rating' ? 'primary' : 'default'}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFilterDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default MedicineCatalog; 