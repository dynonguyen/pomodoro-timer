import { Box } from '@mui/material';
import imgSrc from '../../assets/images/navbar-img.jpg';
import useStyles from '../../styles/DesktopNavbar';
import AccountLogin from '../LoginSignup/AccountLogin';
import NavMenu from './NavMenu';

function DesktopNavbar() {
	const classes = useStyles();

	return (
		<div className={`${classes.root} d-flex flex-col`}>
			<AccountLogin />
			<NavMenu />
			<Box className={classes.image} sx={{ marginTop: 'auto' }}>
				<img src={imgSrc} />
			</Box>
		</div>
	);
}

export default DesktopNavbar;
