import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import './index.css';
import App from './App';
import Theme from './theme';
import { StoreProvider } from './store/store';

const Chart = () => (
  <ThemeProvider theme={Theme}>
    <CssBaseline />
    <StoreProvider>
      <App />
    </StoreProvider>
  </ThemeProvider>
);

ReactDOM.render(<Chart />, document.getElementById('root'));
