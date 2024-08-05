import React from 'react';
import { Box, Typography } from '@mui/material';

const WatermarkDisplay = ({ watermark }) => {
    return (
        <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
            {watermark ? (
                <Typography variant="h6">{watermark}</Typography>
            ) : (
                <Typography variant="h6">----------</Typography>
            )}
        </Box>
    );
};

export default WatermarkDisplay;
