import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export default makeStyles((theme: Theme) => ({
  accountWrap: {
    width: '100%',
    padding: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
  },

  avt: {
    width: '6rem',
    height: '6rem',
  },
}));
