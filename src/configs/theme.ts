import { PaletteMode } from '@mui/material';

export const commonThemes = {
  breakpoints: {
    values: {
      mb: 375,
      xxs: 480,
      xs: 576,
      sm: 776,
      md: 992,
      lg: 1200,
      xl: 1140,
      xxl: 1536,
    },
  },
  shape: {
    borderRadius: 12,
  },
};

export const desginPaletteWithMode = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          primary: {
            main: '#84d26f',
          },
          secondary: {
            main: '#c8ecbe',
          },
          background: {
            paper: '#eaf6ec',
            default: '#fff',
          },
        }
      : {}),
  },
});
