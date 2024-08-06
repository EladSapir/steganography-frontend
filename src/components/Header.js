import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import './Header.css';

const Header = () => {
  const [open, setOpen] = useState(false);

  const handleAboutClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <header className="header">
      <div className="header-content">
        <h1>Steganography Tool</h1>
      </div>
      <Button onClick={handleAboutClick} variant="contained" color="primary" startIcon={<InfoIcon />}>
        About
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>About Steganography</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            This tool uses LSB (Least Significant Bit) steganography to hide and extract watermarks in images. 
            Steganography is the practice of concealing messages or information within other non-secret text or data. 
            In this case, the tool embeds a watermark text into the least significant bits of the image pixels, 
            making the changes imperceptible to the human eye. To extract the watermark, the tool reverses the process, 
            retrieving the hidden information from the image.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </header>
  );
};

export default Header;
