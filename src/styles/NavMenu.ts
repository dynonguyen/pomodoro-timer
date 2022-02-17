import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export default makeStyles((theme: Theme) => ({
	menuItem: {
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(1.5, 1.5),
		borderRadius: theme.shape.btnBorderRadius,
		transition: theme.transitions.easing.easeInOut,
		cursor: 'pointer',

		'&:hover': {
			letterSpacing: '2px',
		},

		'&.active': {
			background: `linear-gradient(45deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.light} 100%)`,

			'& *': {
				color: `${theme.palette.text.secondary} !important`,
			},
		},

		'& *': {
			color: theme.palette.text.primary,
			fontSize: '1rem',
		},
	},
}));
