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

    display: 'grid',
    gridTemplateColumns: '1fr 2fr 1fr',
    gridTemplateRows: '3fr 1fr',
    gap: theme.spacing(2.5),

    [theme.breakpoints.down('sm')]: {
      maxWidth: '90%',
      gridTemplateColumns: '1fr 1fr 1fr',
    },

    [theme.breakpoints.down('xs')]: {
      gridTemplateRows: '6fr 1fr 2fr 1fr',
      width: '100vw',
      height: '100vh',
      maxWidth: '100%',
      borderRadius: 0,
      padding: theme.spacing(2),
    },

    '& > div': {
      borderRadius: theme.shape.borderRadius,
      overflow: 'hidden',
      boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
    },
  },

  navbarWrap: {
    gridColumn: '1/2',
    gridRow: '1/3',

    [theme.breakpoints.down('sm')]: {
      gridColumn: '1/2',
      gridRow: '1/2',
    },

    [theme.breakpoints.down('xs')]: {
      gridColumn: '1/4',
      gridRow: '4/5',
    },
  },

  timerWrap: {
    [theme.breakpoints.down('sm')]: {
      gridColumn: '2/4',
      gridRow: '1/2',
    },

    [theme.breakpoints.down('xs')]: {
      gridColumn: '1/4',
      gridRow: '1/2',
    },
  },

  musicWrap: {
    [theme.breakpoints.down('sm')]: {
      gridColumn: '3/4',
      gridRow: '2/3',
    },

    [theme.breakpoints.down('xs')]: {
      gridColumn: '1/4',
      gridRow: '2/3',
    },
  },

  quoteWrap: {
    gridColumn: '2/4',

    [theme.breakpoints.down('sm')]: {
      gridColumn: '1/3',
      gridRow: '2/3',
    },

    [theme.breakpoints.down('xs')]: {
      gridColumn: '1/4',
      gridRow: '3/4',
    },
  },
}));
