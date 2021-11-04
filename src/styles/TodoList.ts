import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export default makeStyles((theme: Theme) => ({
  selectRoot: {
    borderRadius: `${theme.shape.btnBorderRadius}px !important`,
    height: '100%',
  },

  todoWrap: {
    overflow: 'auto',
    maxHeight: '400px',

    '&::-webkit-scrollbar': {
      width: '5px',
    },

    '&::-webkit-scrollbar-track': {
      background: theme.palette.background.paper,
    },

    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.grey[400],
      borderRadius: 50,
    },
  },

  todoText: {
    fontSize: '1rem !important',
  },

  todoTextSec: {
    fontSize: '0.85rem !important',
    color: `${theme.palette.grey[500]} !important`,
  },

  checkbox: {
    color: `${theme.palette.grey[400]} !important`,
  },

  checkboxChecked: {
    color: `${theme.palette.primary.dark} !important`,
  },

  action: {
    '& *': {
      color: theme.palette.grey[500],
    },
  },
}));
