import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useCommonStyles = makeStyles((theme: Theme) => ({
	buttonClass: {
		borderRadius: `${theme.shape.btnBorderRadius}px !important`,
		color: `${theme.palette.text.secondary} !important`,
		padding: `${theme.spacing(1, 4)} !important`,
		transition: theme.transitions.easing.easeInOut,
		background: `linear-gradient(45deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.light} 100%) !important`,

		'&:hover': {
			letterSpacing: '2px',
		},

		'&.stop': {
			background: `${theme.palette.error.dark} !important`,
		},

		'&.outlined': {
			background: 'transparent !important',
			color: `${theme.palette.text.primary} !important`,
			border: `solid 1px rgba(0, 0, 0, 0.23)`,
		},

		'&.reset': {
			background: `linear-gradient(45deg, ${theme.palette.secondary.dark} 0%, ${theme.palette.secondary.light} 100%) !important`,
		},

		'&.Mui-disabled': {
			background: `${theme.palette.background.paper} !important`,
			color: `${theme.palette.primary.main} !important`,
		},

		'&.no-shadow': {
			boxShadow: 'none !important',
		},

		'&.short': {
			paddingLeft: '1rem !important',
			paddingRight: '1rem !important',
		},
	},

	titleClass: {
		color: theme.palette.text.primary,
		'font-weight': 'bold !important',
		textAlign: 'center',
	},
}));
