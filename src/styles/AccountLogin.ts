import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export default makeStyles((theme: Theme) => ({
  accountWrap: {
    width: '100%',
    padding: theme.spacing(2, 1),
    borderBottomLeftRadius: Number(theme.shape.borderRadius) * 1.5,

    background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
  },

  name: {
    color: theme.palette.common.white,
    fontWeight: 500,
    fontSize: '1.2rem',
    letterSpacing: '0.75px',

    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    maxWidth: '90%',
    textAlign: 'center',
  },

  loginBtn: {
    borderRadius: 8,
    transition: theme.transitions.easing.easeInOut,

    '&:hover': {
      letterSpacing: '2px',
    },
  },
}));
