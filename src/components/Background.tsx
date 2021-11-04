import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import LogoTitle from './Commons/LogoTitle';

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		backgroundColor: theme.palette.mainBackground,
	},
}));

function Background() {
	const classes = useStyles();
	return (
		<div id='bubbleWrap' className={classes.root}>
			{new Array(10).fill(0).map((_, index) => (
				<div key={index} className={`bubble x${index + 1} flex-center`}>
					<LogoTitle />
				</div>
			))}
		</div>
	);
}

export default Background;
