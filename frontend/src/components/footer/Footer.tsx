import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';
import YouTubeIcon from '@mui/icons-material/YouTube';

const Footer = () => {
  return (
    <Box 
      sx={{ 
        backgroundColor: 'black', 
        color: 'white', 
        textAlign: 'center', 
        padding: '20px 0', 
        boxShadow: '0px -5px 15px rgba(0, 0, 0, 0.5)',
        width:"100%",
        marginTop: "175px",
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <IconButton sx={{ color: 'white' }}>
          <FacebookIcon />
        </IconButton>
        <IconButton sx={{ color: 'white' }}>
          <InstagramIcon />
        </IconButton>
        <IconButton sx={{ color: 'white' }}>
          <TwitterIcon />
        </IconButton>
        <IconButton sx={{ color: 'white' }}>
          <GoogleIcon />
        </IconButton>
        <IconButton sx={{ color: 'white' }}>
          <YouTubeIcon />
        </IconButton>
      </Box>
      <Typography sx={{ marginTop: 2 }} variant="body2">
        Copyright ©2024, Designed by Brandon Tan
      </Typography>
    </Box>
  );
};

export default Footer;