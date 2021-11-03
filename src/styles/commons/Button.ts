import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyleBtn = makeStyles((theme: Theme) => ({
  buttonClass: {
    borderRadius: `${theme.shape.btnBorderRadius}px !important`,
    color: `${theme.palette.text.secondary} !important`,
    padding: `${theme.spacing(1, 4)} !important`,
    transition: theme.transitions.easing.easeInOut,
    background: `linear-gradient(45deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.light} 100%) !important`,

    '&:hover': {
      letterSpacing: '2px',
    },

    '&.stop': {
      background: `${theme.palette.error.dark} !important`,
    },

    '&.reset': {
      background: `linear-gradient(45deg, ${theme.palette.secondary.dark} 0%, ${theme.palette.secondary.light} 100%) !important`,
    },

    '&.Mui-disabled': {
      background: `${theme.palette.background.paper} !important`,
      color: `${theme.palette.primary.main} !important`,
    },
  },
}));
