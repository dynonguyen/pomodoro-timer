import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export default makeStyles((theme: Theme) => ({
  wrapper: {
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
  },

  paper: {
    padding: '1.6rem',
    width: theme.breakpoints.values.md,
    maxWidth: '90%',
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: 'rgba(0, 0, 0, 0.25) 0px 25px 50px -12px',

    display: 'grid',
    gridTemplateColumns: '1fr 2fr 1fr',
    gridTemplateRows: '2fr 1fr',
    gap: theme.spacing(2),

    height: '65vh',

    [theme.breakpoints.down('sm')]: {
      maxWidth: '90%',
      gridTemplateColumns: '1fr 1fr 1fr',
    },

    [theme.breakpoints.down('xs')]: {
      gridTemplateRows: '1fr 5fr 2fr 2fr',
      maxWidth: '95%',
    },

    '& > div': {
      borderRadius: theme.shape.borderRadius,
    },
  },

  navbarWrap: {
    backgroundColor: 'pink',
    gridColumn: '1/2',
    gridRow: '1/3',

    [theme.breakpoints.down('sm')]: {
      gridColumn: '1/2',
      gridRow: '1/2',
    },

    [theme.breakpoints.down('xs')]: {
      gridColumn: '1/4',
      gridRow: '1/2',
    },
  },

  timerWrap: {
    backgroundColor: 'gold',

    [theme.breakpoints.down('sm')]: {
      gridColumn: '2/4',
      gridRow: '1/2',
    },

    [theme.breakpoints.down('xs')]: {
      gridColumn: '1/4',
      gridRow: '2/3',
    },
  },

  musicWrap: {
    backgroundColor: 'brown',

    [theme.breakpoints.down('sm')]: {
      gridColumn: '3/4',
      gridRow: '2/3',
    },

    [theme.breakpoints.down('xs')]: {
      gridColumn: '1/4',
      gridRow: '3/4',
    },
  },

  quoteWrap: {
    backgroundColor: 'green',
    gridColumn: '2/4',

    [theme.breakpoints.down('sm')]: {
      gridColumn: '1/3',
      gridRow: '2/3',
    },

    [theme.breakpoints.down('xs')]: {
      gridColumn: '1/4',
      gridRow: '4/5',
    },
  },
}));
