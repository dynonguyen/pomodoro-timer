import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export default makeStyles((theme: Theme) => ({
	box: {
		backgroundColor: 'rgba(132, 210, 111, 0.25)',
		padding: '0.75rem',
		borderRadius: '8px',
	},
	icon: {
		color: theme.palette.primary.light,
		fontSize: '1.75rem !important',
	},
	label: { color: theme.palette.primary.main },
	count: {
		alignSelf: 'center',
		color: theme.palette.primary.main,
		fontSize: '2.25rem !important',
	},
}));
