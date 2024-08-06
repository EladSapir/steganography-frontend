import React from 'react';
import { Box, Typography } from '@mui/material';
import DownloadButton from './DownloadButton';

const ImageDisplay = ({ image }) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={4} className="fade-in">
      {image ? (
        <>
          <img src={image} alt="Processed" style={{ maxWidth: '100%', maxHeight: '500px', objectFit: 'contain', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }} />
          <DownloadButton image={image} />
        </>
      ) : (
        <Typography variant="h6">----------</Typography>
      )}
    </Box>
  );
};

export default ImageDisplay;
