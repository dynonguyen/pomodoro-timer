import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export default makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%',
  },

  image: {
    width: '100%',
    textAlign: 'center',

    '& img': {
      width: '100%',
      maxHeight: 180,
      objectFit: 'cover',
    },
  },
}));
