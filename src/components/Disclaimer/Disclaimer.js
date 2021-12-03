import React from 'react';
import { Box } from '@mui/material';
import useStore from '../../store';

// eslint-disable-next-line react/prop-types
const Disclaimer = () => {
  const { data } = useStore();
  if (!data || !data.disclaimer) return <div />;

  return (

    <Box sx={{
      marginTop: '35px',
      fontSize: '11px',
      color: 'white',
      opacity: 0.4,
    }}
    >
      {data.disclaimer}
    </Box>
  );
};

export default Disclaimer;
