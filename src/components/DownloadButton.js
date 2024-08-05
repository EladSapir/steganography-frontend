import React from 'react';
import { Button } from '@mui/material';

const DownloadButton = ({ image }) => {
    return (
        <a href={image} download="watermarked_image.png" style={{ textDecoration: 'none' }}>
            <Button variant="contained" color="primary" style={{ marginTop: '20px' }}>
                Download Image
            </Button>
        </a>
    );
};

export default DownloadButton;
