import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export default makeStyles((theme: Theme) => ({
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
