import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export default makeStyles((theme: Theme) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '3fr 1fr',
    gridTemplateRows: '5fr 2fr',
    gap: theme.spacing(2),

    [theme.breakpoints.down('xs')]: {
      gridTemplateColumns: '1fr',
      gridTemplateRows: '4fr 1fr',
    },
  },

  timerWrap: {
    gridColumn: '1/2',

    [theme.breakpoints.down('sm')]: {
      gridColumn: '1/3',
    },

    [theme.breakpoints.down('xs')]: {
      gridColumn: '1/1',
      gridRow: '1/2',
    },
  },

  musicWrap: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },

    gridColumn: '2/3',
  },

  quoteWrap: {
    gridColumn: '1/3',
    [theme.breakpoints.down('xs')]: {
      gridColumn: '1/1',
      gridRow: '2/3',
    },
  },
}));
