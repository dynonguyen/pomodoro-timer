import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export default makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100% !important',
    width: '100% !important',
    backgroundColor: `${theme.palette.background.default} !important`,
  },

  actionBtn: {
    color: `${theme.palette.text.primary} !important`,

    '&.Mui-selected': {
      color: `${theme.palette.primary.dark} !important`,
    },
  },
}));
