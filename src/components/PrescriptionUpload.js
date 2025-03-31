import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  IconButton,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  CloudUpload as CloudUploadIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { keyframes } from '@mui/system';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const PrescriptionUpload = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      // Validate file type
      if (!selectedFile.type.match('image.*') && !selectedFile.type.match('application/pdf')) {
        setError('Please upload an image or PDF file');
        return;
      }

      // Validate file size (max 5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError('File size should be less than 5MB');
        return;
      }

      setFile(selectedFile);
      setError(null);
      setSuccess(false);

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    setUploading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would typically send the file to your backend
      // const formData = new FormData();
      // formData.append('prescription', file);
      // await axios.post('/api/upload-prescription', formData);

      setSuccess(true);
      setFile(null);
      setPreview(null);
    } catch (err) {
      setError('Failed to upload prescription. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setFile(null);
    setPreview(null);
    setError(null);
    setSuccess(false);
  };

  return (
    <Card
      sx={{
        maxWidth: 600,
        mx: 'auto',
        mt: 4,
        animation: `${fadeIn} 0.5s ease-out`,
      }}
    >
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          Upload Prescription
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Prescription uploaded successfully!
          </Alert>
        )}

        <Box
          sx={{
            border: '2px dashed',
            borderColor: 'primary.main',
            borderRadius: 2,
            p: 3,
            textAlign: 'center',
            mb: 2,
            position: 'relative',
            minHeight: 200,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {preview ? (
            <>
              {file.type.match('image.*') ? (
                <Box
                  component="img"
                  src={preview}
                  alt="Prescription preview"
                  sx={{
                    maxWidth: '100%',
                    maxHeight: 300,
                    objectFit: 'contain',
                  }}
                />
              ) : (
                <Box
                  component="iframe"
                  src={preview}
                  sx={{
                    width: '100%',
                    height: 300,
                    border: 'none',
                  }}
                />
              )}
              <IconButton
                onClick={handleRemove}
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  bgcolor: 'background.paper',
                  '&:hover': {
                    bgcolor: 'error.light',
                    color: 'error.contrastText',
                  },
                }}
              >
                <DeleteIcon />
              </IconButton>
            </>
          ) : (
            <>
              <CloudUploadIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="body1" gutterBottom>
                Drag and drop your prescription here or
              </Typography>
              <Button
                variant="contained"
                component="label"
                startIcon={<CloudUploadIcon />}
                sx={{ mt: 1 }}
              >
                Browse Files
                <input
                  type="file"
                  hidden
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                />
              </Button>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                Supported formats: JPG, PNG, PDF (Max size: 5MB)
              </Typography>
            </>
          )}
        </Box>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleUpload}
          disabled={!file || uploading}
          startIcon={uploading ? <CircularProgress size={20} /> : null}
        >
          {uploading ? 'Uploading...' : 'Upload Prescription'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default PrescriptionUpload; 