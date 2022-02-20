import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export default makeStyles((theme: Theme) => ({
	root: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
	},

	modeBtn: {
		fontSize: '1rem',
		fontWeight: 500,
		color: theme.palette.grey[500],
		padding: theme.spacing(1, 2),
		cursor: 'pointer',
		marginRight: '1rem',

		'&.active': {
			color: theme.palette.primary.main,
			backgroundColor: theme.palette.background.paper,
			borderRadius: theme.shape.btnBorderRadius,
		},
	},
}));
