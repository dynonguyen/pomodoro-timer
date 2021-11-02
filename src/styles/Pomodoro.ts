import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export default makeStyles((theme: Theme) => ({
  root: {
    display: 'grid',
    gridTemplateRows: '5fr 5fr 3fr',
    gridTemplateColumns: '2fr 1fr',
    gridGap: theme.spacing(2),

    [theme.breakpoints.down('xs')]: {
      gridTemplateColumns: '1fr',
      gridTemplateRows: '3fr 1fr',
    },
  },

  timerWrap: {
    gridRow: '1/3',
    gridColumn: '1/2',
    padding: theme.spacing(2),

    [theme.breakpoints.down('sm')]: {
      gridColumn: '1/3',
    },

    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(1),
      gridColumn: '1/1',
      gridRow: '1/2',
    },
  },

  taskWrap: {
    gridRow: '1/2',
    gridColumn: '2/3',
  },

  musicWrap: {
    gridRow: '2/3',
    gridColumn: '2/3',
  },

  quoteWrap: {
    gridRow: '3/4',
    gridColumn: '1/3',

    [theme.breakpoints.down('xs')]: {
      gridColumn: '1/1',
      gridRow: '2/3',
    },
  },
}));
