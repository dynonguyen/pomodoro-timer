import { Box } from '@mui/material';
import imgSrc from '../assets/image.png';
import useStyles from '../styles/DesktopNavbar';
import AccountLogin from './AccountLogin';
import NavMenu from './NavMenu';

function DesktopNavbar() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<AccountLogin />
			<NavMenu />
			<Box className={classes.image}>
				<img src={imgSrc} />
			</Box>
		</div>
	);
}

export default DesktopNavbar;
