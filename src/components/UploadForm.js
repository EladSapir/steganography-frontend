import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Container, Typography, Box, CircularProgress } from '@mui/material';
import './UploadForm.css';
import Loader from './Loader';

const UploadForm = ({ mode, setImage, setWatermark, reset }) => {
  const [file, setFile] = useState(null);
  const [hiddenFile, setHiddenFile] = useState(null); // New state for hidden image
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', file);

    if (mode === 'hide-text') {
      formData.append('text', text);
    } else if (mode === 'hide-image') {
      formData.append('hiddenImage', hiddenFile); // Append hidden image
      if (!isImageSizeValid(file, hiddenFile)) {
        alert("The carrier image should be significantly bigger than the image to hide, otherwise it won't work.");
        return;
      }
    } else if (mode === 'extract-image') {
      formData.append('mode', 'image'); // Specify that the decoding mode is for an image
    } else if (mode === 'extract-text') {
      formData.append('mode', 'text'); // Specify that the decoding mode is for text
    }

    try {
      setLoading(true);
      alert('This process can take up to 1-2 minutes, please be patient.');
      const url = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
      let response;
      if (mode === 'hide-text' || mode === 'hide-image') {
        response = await axios.post(`${url}/encode`, formData, {
          responseType: 'blob',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        const imageURL = URL.createObjectURL(new Blob([response.data]));
        setImage(imageURL);
      } else if (mode === 'extract-text') {
        response = await axios.post(`${url}/decode`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setWatermark(response.data.watermark);
      } else if (mode === 'extract-image') {
        response = await axios.post(`${url}/decode`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          responseType: 'blob',
        });
        const hiddenImageURL = URL.createObjectURL(new Blob([response.data]));
        setImage(hiddenImageURL); // Set the extracted image
      }
    } catch (error) {
      console.error(`Error ${mode.includes('hide') ? 'hiding' : 'extracting'}:`, error);
      alert(`Failed to ${mode.includes('hide') ? 'hide' : 'extract'}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  const isImageSizeValid = (carrierImage, hiddenImage) => {
    if (!carrierImage || !hiddenImage) return false;

    const carrierSize = carrierImage.size;
    const hiddenSize = hiddenImage.size;

    // Ensure the carrier image is at least 2x larger than the hidden image
    return carrierSize > hiddenSize * 2;
  };

  return (
    <Container style={{ textAlign: 'center', marginTop: '50px' }} className="fade-in">
      {loading && (
        <div>
          <CircularProgress />
          <Typography variant="h6" gutterBottom>
            Processing... This may take up to 1-2 minutes.
          </Typography>
        </div>
      )}
      {!loading && (
        <>
          <Typography variant="h5" gutterBottom>
            {mode === 'hide-text'
              ? 'Hide Watermark in Image'
              : mode === 'hide-image'
              ? 'Hide Image in Image'
              : mode === 'extract-text'
              ? 'Extract Watermark from Image'
              : 'Extract Image from Image'}
          </Typography>
          <Typography variant="body2" color="error">
            {mode === 'hide-image' && 'Ensure the carrier image is significantly larger than the hidden image.'}
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
              <div className="file-input-wrapper">
                <label className="custom-file-upload">
                  <input className="file-input" type="file" onChange={(e) => setFile(e.target.files[0])} required />
                  Choose File
                </label>
                {file && <Typography variant="body2">{file.name}</Typography>}
              </div>
            </Box>
            {mode === 'hide-text' && (
              <Box mb={2} width="100%">
                <TextField
                  label="Watermark Text"
                  variant="outlined"
                  fullWidth
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  required
                />
              </Box>
            )}
            {mode === 'hide-image' && (
              <Box mb={2} width="100%">
                <Typography variant="body1" gutterBottom>
                  Select Image to Hide:
                </Typography>
                <div className="file-input-wrapper">
                  <label className="custom-file-upload">
                    <input
                      className="file-input"
                      type="file"
                      onChange={(e) => setHiddenFile(e.target.files[0])}
                      required
                    />
                    Choose Hidden Image
                  </label>
                  {hiddenFile && <Typography variant="body2">{hiddenFile.name}</Typography>}
                </div>
              </Box>
            )}
            <Button type="submit" variant="contained" color="primary" style={{ marginBottom: '20px' }}>
              {mode.includes('hide') ? 'Hide' : 'Extract'}
            </Button>
          </form>
          <Box mt={4}>
            <Button variant="outlined" color="secondary" onClick={reset}>
              Back to Selection
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
};

export default UploadForm;
