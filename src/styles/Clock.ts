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
}));
