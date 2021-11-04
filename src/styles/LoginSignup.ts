import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export default makeStyles((theme: Theme) => ({
  formWrap: {
    minWidth: '20rem',
    maxWidth: '25rem',
    margin: '0 auto',
  },

  errorMessage: {
    color: theme.palette.error.main,
    backgroundColor: theme.palette.box,
    textAlign: 'center',
    padding: theme.spacing(1),
  },

  submitBtn: {
    borderRadius: '4px',
    height: '2.5rem',
  },

  redirectMessage: {
    textAlign: 'center',
    fontSize: '0.9rem',
    color: theme.palette.grey[500],
  },

  link: {
    color: theme.palette.secondary.light,
  },
}));
