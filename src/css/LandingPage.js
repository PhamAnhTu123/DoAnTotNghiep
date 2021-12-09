/* eslint-disable no-unused-vars */
import { createStyles, makeStyles } from '@mui/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { height } from '@mui/system';

const useStyles = makeStyles((theme) => ({
    navItem: { 
      color: 'white !important',
      fontWeight: 600,
      padding: '10px',
      "&:hover": {
        borderBottom: 'solid'
      },
    },
    logo: {
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: '50px',
    },
    navLogin: {
      padding: '10px',
      width: '50',
      height: '50',
      color: 'white !important',
      fontWeight: 600,
      "&:hover": {
        borderBottom: 'solid'
      },
    },
    firstCardLine: {
      backgroundColor: '#f5f5f5 !important;',
      height: '400px',
    },
  })
);

export default useStyles;

