import React from 'react';
import { CircularProgress, Grid } from '@mui/material/';

const Loading = () => (
  <Grid
    container
    alignItems="center"
    style={{ width: '100%', height: '100vh' }}
  >
    <Grid item align="center" xs={12}>
      <CircularProgress size="10vh" color="primary" />
    </Grid>
  </Grid>
);

export default Loading;
