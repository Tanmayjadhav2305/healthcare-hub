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
import { medicines, categories } from '../data/medicines';

const MedicineCatalog = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [sortBy, setSortBy] = useState('name');
  const [searchType, setSearchType] = useState('medicine');
  const [tabValue, setTabValue] = useState(0);
  const [medicinesList, setMedicinesList] = useState(medicines);

  const filteredMedicines = medicinesList.filter((medicine) => {
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
    setMedicinesList(prevMedicines => 
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
      <Grid container spacing={3}>
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
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {medicine.description}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Rating value={medicine.rating} precision={0.1} readOnly size="small" />
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                    ({medicine.reviews} reviews)
                  </Typography>
                </Box>
                <Typography variant="h6" color="primary" gutterBottom>
                  ${medicine.price}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <Chip
                    label={medicine.category}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                  <Chip
                    label={medicine.availability}
                    size="small"
                    color={medicine.availability === 'In Stock' ? 'success' : 'error'}
                  />
                </Box>
                <Button
                  variant="contained"
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
      <Dialog open={filterDialogOpen} onClose={() => setFilterDialogOpen(false)}>
        <DialogTitle>Filter Medicines</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Category</InputLabel>
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                label="Category"
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                label="Sort By"
              >
                <MenuItem value="name">Name (A-Z)</MenuItem>
                <MenuItem value="price-asc">Price (Low to High)</MenuItem>
                <MenuItem value="price-desc">Price (High to Low)</MenuItem>
                <MenuItem value="rating">Rating</MenuItem>
              </Select>
            </FormControl>
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