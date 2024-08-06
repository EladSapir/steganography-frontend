import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Container, Typography, Box } from '@mui/material';
import './UploadForm.css';

const UploadForm = ({ mode, setImage, setWatermark, reset }) => {
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', file);
    if (mode === 'hide') {
      formData.append('text', text);
    }

    try {
      const url = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
      let response;
      if (mode === 'hide') {
        response = await axios.post(`${url}/encode`, formData, {
          responseType: 'blob',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        const imageURL = URL.createObjectURL(new Blob([response.data]));
        setImage(imageURL);
      } else if (mode === 'extract') {
        response = await axios.post(`${url}/decode`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setWatermark(response.data.watermark);
      }
    } catch (error) {
      console.error(`Error ${mode === 'hide' ? 'hiding' : 'extracting'} watermark:`, error);
      alert(`Failed to ${mode === 'hide' ? 'hide' : 'extract'} watermark. Please try again.`);
    }
  };

  return (
    <Container style={{ textAlign: 'center', marginTop: '50px' }} className="fade-in">
      <Typography variant="h5" gutterBottom>
        {mode === 'hide' ? 'Hide Watermark in Image' : 'Extract Watermark from Image'}
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
        {mode === 'hide' && (
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
        <Button type="submit" variant="contained" color="primary" style={{ marginBottom: '20px' }}>
          {mode === 'hide' ? 'Hide Watermark' : 'Extract Watermark'}
        </Button>
      </form>
      <Box mt={4}>
        <Button variant="outlined" color="secondary" onClick={reset}>
          Back to Selection
        </Button>
      </Box>
    </Container>
  );
};

export default UploadForm;
