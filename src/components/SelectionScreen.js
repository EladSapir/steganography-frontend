import React from 'react';
import { Button, Container, Typography, Box } from '@mui/material';

const SelectionScreen = ({ setMode }) => {
  return (
    <Container style={{ textAlign: 'center', marginTop: '50px' }} className="fade-in">
      <Typography variant="h4" gutterBottom>
        Welcome to the Steganography Tool
      </Typography>
      <Typography variant="h6" gutterBottom>
        Please choose an option:
      </Typography>
      <Box mt={4}>
        <Button variant="contained" color="primary" style={{ margin: '10px' }} onClick={() => setMode('hide-text')}>
          Hide Watermark in Image
        </Button>
        <Button variant="contained" color="secondary" style={{ margin: '10px' }} onClick={() => setMode('extract-text')}>
          Extract Watermark from Image
        </Button>
        <Button variant="contained" color="primary" style={{ margin: '10px' }} onClick={() => setMode('hide-image')}>
          Hide Image in Image
        </Button>
        <Button variant="contained" color="secondary" style={{ margin: '10px' }} onClick={() => setMode('extract-image')}>
          Extract Image from Image
        </Button>
      </Box>
    </Container>
  );
};

export default SelectionScreen;
