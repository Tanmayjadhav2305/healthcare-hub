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

const mockMedicines = [
  {
    id: 1,
    name: 'Ciprofloxacin',
    description: 'Antibiotic medication for bacterial infections',
    price: 15.99,
    image: 'https://img.freepik.com/free-photo/medical-bills-healthcare-insurance-concept_23-2149151355.jpg',
    category: 'Antibiotics',
    prescriptionRequired: true,
    availability: 'In Stock',
    rating: 4.5,
    reviews: 128,
    manufacturer: 'PharmaCorp',
    uses: ['Bacterial Infections', 'UTI', 'Respiratory Infections'],
    sideEffects: ['Nausea', 'Diarrhea', 'Headache'],
    dosage: '500mg twice daily',
    isFavorite: false,
  },
  {
    id: 2,
    name: 'Paracetamol',
    description: 'Pain reliever and fever reducer',
    price: 5.99,
    image: 'https://img.freepik.com/free-photo/medical-bills-healthcare-insurance-concept_23-2149151355.jpg',
    category: 'Pain Relief',
    prescriptionRequired: false,
    availability: 'In Stock',
    rating: 4.8,
    reviews: 256,
    manufacturer: 'HealthCare Plus',
    uses: ['Fever', 'Pain Relief', 'Headache'],
    sideEffects: ['Liver Problems', 'Allergic Reactions'],
    dosage: '500mg as needed',
    isFavorite: false,
  },
  {
    id: 3,
    name: 'Amoxicillin',
    description: 'Broad-spectrum antibiotic',
    price: 12.99,
    image: 'https://img.freepik.com/free-photo/medical-bills-healthcare-insurance-concept_23-2149151355.jpg',
    category: 'Antibiotics',
    prescriptionRequired: true,
    availability: 'Out of Stock',
    rating: 4.2,
    reviews: 80,
    manufacturer: 'HealthCare Plus',
    uses: ['Bacterial Infections', 'UTI', 'Respiratory Infections'],
    sideEffects: ['Nausea', 'Diarrhea', 'Headache'],
    dosage: '500mg twice daily',
    isFavorite: false,
  },
  {
    id: 4,
    name: 'Ibuprofen',
    description: 'Anti-inflammatory pain reliever',
    price: 8.99,
    image: 'https://img.freepik.com/free-photo/medical-bills-healthcare-insurance-concept_23-2149151355.jpg',
    category: 'Pain Relief',
    prescriptionRequired: false,
    availability: 'In Stock',
    rating: 4.7,
    reviews: 192,
    manufacturer: 'HealthCare Plus',
    uses: ['Fever', 'Pain Relief', 'Headache'],
    sideEffects: ['Liver Problems', 'Allergic Reactions'],
    dosage: '500mg as needed',
    isFavorite: false,
  },
  {
    id: 5,
    name: 'Vitamin C',
    description: 'Immune system support supplement',
    price: 9.99,
    image: 'https://img.freepik.com/free-photo/medical-bills-healthcare-insurance-concept_23-2149151355.jpg',
    category: 'Vitamins',
    prescriptionRequired: false,
    availability: 'In Stock',
    rating: 4.3,
    reviews: 128,
    manufacturer: 'HealthCare Plus',
    uses: ['Immune System Support', 'Antioxidant'],
    sideEffects: [],
    dosage: '500mg daily',
    isFavorite: false,
  },
  {
    id: 6,
    name: 'Omeprazole',
    description: 'Acid reflux medication',
    price: 14.99,
    image: 'https://img.freepik.com/free-photo/medical-bills-healthcare-insurance-concept_23-2149151355.jpg',
    category: 'Digestive Health',
    prescriptionRequired: true,
    availability: 'In Stock',
    rating: 4.6,
    reviews: 160,
    manufacturer: 'HealthCare Plus',
    uses: ['Acid Reflux', 'Gastroesophageal Reflux Disease'],
    sideEffects: ['Headache', 'Diarrhea', 'Constipation'],
    dosage: '20mg daily',
    isFavorite: false,
  },
  {
    id: 7,
    name: 'Cetirizine',
    description: 'Antihistamine for allergies',
    price: 7.99,
    image: 'https://img.freepik.com/free-photo/medical-bills-healthcare-insurance-concept_23-2149151355.jpg',
    category: 'Allergy',
    prescriptionRequired: false,
    availability: 'In Stock',
    rating: 4.4,
    reviews: 128,
    manufacturer: 'HealthCare Plus',
    uses: ['Allergic Rhinitis', 'Urticaria'],
    sideEffects: ['Drowsiness', 'Dry Mouth', 'Headache'],
    dosage: '10mg daily',
    isFavorite: false,
  },
  {
    id: 8,
    name: 'Metformin',
    description: 'Diabetes medication',
    price: 11.99,
    image: 'https://img.freepik.com/free-photo/medical-bills-healthcare-insurance-concept_23-2149151355.jpg',
    category: 'Diabetes',
    prescriptionRequired: true,
    availability: 'In Stock',
    rating: 4.1,
    reviews: 96,
    manufacturer: 'HealthCare Plus',
    uses: ['Type 2 Diabetes'],
    sideEffects: ['Diarrhea', 'Nausea', 'Abdominal Pain'],
    dosage: '500mg daily',
    isFavorite: false,
  },
  {
    id: 9,
    name: 'Vitamin D3',
    description: 'Vitamin D supplement',
    price: 6.99,
    image: 'https://img.freepik.com/free-photo/medical-bills-healthcare-insurance-concept_23-2149151355.jpg',
    category: 'Vitamins',
    prescriptionRequired: false,
    availability: 'In Stock',
    rating: 4.0,
    reviews: 64,
    manufacturer: 'HealthCare Plus',
    uses: ['Bone Health', 'Immune System Support'],
    sideEffects: [],
    dosage: '5000IU daily',
    isFavorite: false,
  },
  {
    id: 10,
    name: 'Amlodipine',
    description: 'Blood pressure medication',
    price: 13.99,
    image: 'https://img.freepik.com/free-photo/medical-bills-healthcare-insurance-concept_23-2149151355.jpg',
    category: 'Cardiovascular',
    prescriptionRequired: true,
    availability: 'In Stock',
    rating: 4.3,
    reviews: 128,
    manufacturer: 'HealthCare Plus',
    uses: ['High Blood Pressure'],
    sideEffects: ['Edema', 'Palpitations', 'Headache'],
    dosage: '5mg daily',
    isFavorite: false,
  },
  {
    id: 11,
    name: 'Zinc Supplements',
    description: 'Immune system booster',
    price: 8.99,
    image: 'https://img.freepik.com/free-photo/medical-bills-healthcare-insurance-concept_23-2149151355.jpg',
    category: 'Supplements',
    prescriptionRequired: false,
    availability: 'In Stock',
    rating: 4.5,
    reviews: 128,
    manufacturer: 'HealthCare Plus',
    uses: ['Immune System Support', 'Antioxidant'],
    sideEffects: [],
    dosage: '15mg daily',
    isFavorite: false,
  },
  {
    id: 12,
    name: 'Lisinopril',
    description: 'ACE inhibitor for blood pressure',
    price: 16.99,
    image: 'https://img.freepik.com/free-photo/medical-bills-healthcare-insurance-concept_23-2149151355.jpg',
    category: 'Cardiovascular',
    prescriptionRequired: true,
    availability: 'Out of Stock',
    rating: 4.0,
    reviews: 64,
    manufacturer: 'HealthCare Plus',
    uses: ['High Blood Pressure'],
    sideEffects: ['Cough', 'Dizziness', 'Hyperkalemia'],
    dosage: '10mg daily',
    isFavorite: false,
  },
];

const categories = [
  'All',
  'Antibiotics',
  'Pain Relief',
  'Vitamins',
  'Supplements',
  'Digestive Health',
  'Allergy',
  'Diabetes',
  'Cardiovascular',
  'Respiratory',
  'Mental Health',
  'Skin Care',
];

const MedicineCatalog = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [sortBy, setSortBy] = useState('name');
  const [searchType, setSearchType] = useState('medicine'); // 'medicine' or 'disease'
  const [tabValue, setTabValue] = useState(0);

  const filteredMedicines = mockMedicines.filter((medicine) => {
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
    navigate(`/medicine/${medicineId}`);
  };

  const handleAddToCart = (medicine) => {
    addToCart(medicine);
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
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle favorite toggle
                  }}
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