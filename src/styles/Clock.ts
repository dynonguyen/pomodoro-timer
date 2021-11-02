import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export default makeStyles((theme: Theme) => ({
  circle: {
    color: `${theme.palette.primary.main} !important`,
  },

  timeBlock: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',

    fontSize: '2.4rem',
    fontWeight: 'bold',
    color: theme.palette.text.primary,
  },

  button: {
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
