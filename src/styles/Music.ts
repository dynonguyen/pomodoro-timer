import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

function delayMusicAnimation(n = 0) {
	let css: any = {};
	for (let i = 1; i <= n; ++i) {
		css[`&:nth-child(${i})`] = { animationDelay: `${(i - 1) * 0.1}s` };
	}
	return css;
}

export default makeStyles((theme: Theme) => ({
	musicStroke: {
		height: '100%',
		width: '0.3rem',
		backgroundColor: theme.palette.primary.main,
		borderRadius: 50,
		...delayMusicAnimation(16),
	},

	musicAnimation: {
		animation: '$music 0.8s linear infinite',
	},

	'@keyframes music': {
		'50%': {
			height: '20%',
			backgroundColor: theme.palette.secondary.main,
		},
		'100%': {
			height: '100%',
		},
	},

	musicControls: {
		'& *': {
			color: `${theme.palette.text.primary} !important`,
		},
	},

	selectRoot: {
		height: '3rem',
		borderRadius: `${theme.shape.btnBorderRadius} !important`,
	},

	volumeIcon: {
		color: theme.palette.text.primary,
	},
}));
