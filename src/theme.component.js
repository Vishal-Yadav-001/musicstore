import { createTheme } from '@mui/material/styles';
import { blue, deepOrange, green, purple, red } from '@mui/material/colors';

const  theme = createTheme({
  palette: {
    // mode: 'dark',
    // primary:{

    // },
    secondary:{
     main: "#181818",
     light:"#263238"
    },
    accent:{
      main: "#7b818a",
      light: red[300],
      dark:  blue[400],
    },
    other:{
      main: "#eef2f7",
      dark:purple[800]
    }
  },
  typography:{
    allVariants:{
      color:"#eef2f7"
    }
  }
});

export default theme;