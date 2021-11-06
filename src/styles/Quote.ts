import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

interface Props {
	quoteBg: string;
}

export default makeStyles((theme: Theme) => ({
	root: {
		backgroundImage: (props: Props) => `url(${props.quoteBg})`,
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center center',
		position: 'relative',
		padding: theme.spacing(2),

		'&::before': {
			content: '""',
			position: 'absolute',
			top: 0,
			left: 0,
			width: '100%',
			height: '100%',
			backgroundColor: 'rgba(50,50,50,0.45)',
			filter: 'blur(1px)',
			zIndex: 2,
		},

		'& *': {
			color: theme.palette.grey[300],
			zIndex: 3,
		},
	},

	timeWrap: {
		flexShrink: 0,

		'& .time': {
			fontSize: '2.2rem',
			fontWeight: 500,
			color: theme.palette.common.white,
		},

		'& .date': {
			fontSize: '1.2rem',
			fontWeight: 300,
		},
	},

	break: {
		margin: theme.spacing(0, 3),
		width: '2px',
		height: '100%',
		backgroundColor: theme.palette.grey[400],

		[theme.breakpoints.down('xs')]: {
			width: '1px',
		},
	},

	quote: {
		fontSize: '1.1rem',
		fontWeight: 300,
	},

	author: {
		textAlign: 'right',
		fontSize: '1rem',
		fontWeight: 300,
		marginTop: theme.spacing(1),
	},
}));
