import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export default makeStyles((theme: Theme) => ({
  inputGroup: {
    height: '3rem',
    position: 'relative',
  },

  inputIcon: {
    padding: '1rem',
    backgroundColor: theme.palette.input?.iconBg,
    borderRadius: '4px 0 0 4px',
  },

  icon: {
    color: theme.palette.input?.inputBg,
  },

  input: {
    padding: '1rem',
    outline: 'none',
    border: 'none',
    backgroundColor: theme.palette.input?.inputBg,
    borderRadius: '0 4px 4px 0',
    fontSize: '1rem',
    color: theme.palette.text.primary,
  },

  passwordIcon: {
    position: 'absolute',
    top: '50%',
    right: '10px',
    transform: 'translateY(-50%)',
    color: theme.palette.grey[500],
    zIndex: 999,
    cursor: 'pointer',
    fontSize: '1.25rem !important',
  },
}));
