import React from 'react';
import { Button, Container, Typography } from '@mui/material';

const SelectionScreen = ({ setMode }) => {
    return (
        <Container style={{ textAlign: 'center', marginTop: '50px' }}>
            <Typography variant="h4" gutterBottom>
                Welcome to the Steganography Tool
            </Typography>
            <Typography variant="h6" gutterBottom>
                Please choose an option:
            </Typography>
            <Button variant="contained" color="primary" style={{ margin: '10px' }} onClick={() => setMode('hide')}>
                Hide Watermark in Image
            </Button>
            <Button variant="contained" color="secondary" style={{ margin: '10px' }} onClick={() => setMode('extract')}>
                Extract Watermark from Image
            </Button>
        </Container>
    );
};

export default SelectionScreen;
