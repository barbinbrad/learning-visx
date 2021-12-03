import { createTheme } from '@mui/material/';
import Colors from './colors';

const theme = createTheme({
  typography: {
    fontFamily: '"Inter", sans-serif',
    h1: {
      fontWeight: 700,
    },
  },
  palette: {
    mode: 'dark',
    primary: {
      light: Colors.lightGreen50,
      main: Colors.lightGreen800,
      dark: Colors.lightGreen900,
    },
    secondary: {
      light: Colors.lightRed50,
      main: Colors.lightRed800,
      dark: Colors.lightRed900,
    },
    background: {
      paper: Colors.black10,
    },
  },
});

export default theme;
