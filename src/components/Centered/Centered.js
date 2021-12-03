import React from 'react';
import { Box } from '@mui/material';

// eslint-disable-next-line react/prop-types
const Centered = ({ children }) => (
  <Box sx={{
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  }}
  >
    { children }
  </Box>
);

export default Centered;
