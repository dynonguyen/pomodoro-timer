import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export default makeStyles((theme: Theme) => ({
	titleWrap: {
		maxWidth: '375px',
		margin: '0 auto 2rem',

		[theme.breakpoints.down('xs')]: {
			margin: '0 auto 1rem',
		},
	},

	title: {
		color: theme.palette.text.primary,
	},

	logo: {
		width: '3.5rem',
		height: '3.5rem',
		marginLeft: theme.spacing(1),
	},
}));
