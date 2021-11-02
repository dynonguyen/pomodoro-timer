import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export default makeStyles((theme: Theme) => ({
  wrapper: {
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
  },

  paper: {
    padding: theme.spacing(4),
    width: theme.breakpoints.values.lg,
    maxWidth: '90%',
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: 'rgba(0, 0, 0, 0.25) 0px 25px 50px -12px',
    margin: '0 auto',

    [theme.breakpoints.down('xs')]: {
      width: '100vw',
      height: '100vh',
      maxWidth: '100%',
      borderRadius: 0,
      padding: theme.spacing(2),
    },
  },

  paperContent: {
    display: 'grid',
    gridTemplateColumns: '1fr 3fr',
    gridGap: theme.spacing(2.5),

    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '3fr 7fr',
    },

    [theme.breakpoints.down('xs')]: {
      gridTemplateRows: '9fr 1fr',
      gridTemplateColumns: '1fr',
      width: '100%',
      height: '100%',
    },

    '& .box': {
      borderRadius: theme.shape.borderRadius,
      overflow: 'hidden',
      boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
      backgroundColor: theme.palette.background.default,
    },
  },

  navbarWrap: {
    [theme.breakpoints.down('xs')]: {
      gridRow: '2/3',
    },
  },
}));
