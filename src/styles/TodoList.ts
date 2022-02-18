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

	taskFormPaper: {
		backgroundColor: '#fff !important',
		minWidth: '350px !important',
	},

	taskFormActions: {
		padding: '12px 24px !important',
	},

	errorMessage: {
		color: theme.palette.error.main,
		backgroundColor: theme.palette.box,
		textAlign: 'center',
		padding: theme.spacing(1),
		marginBottom: '12px !important',
	},
}));
