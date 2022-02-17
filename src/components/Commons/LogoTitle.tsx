import logoImgSrc from '../../assets/images/logo.png';
import useStyles from '../../styles/LogoTitle';

function LogoTitle() {
	const classes = useStyles();

	return (
		<div className={`${classes.titleWrap} flex-center`}>
			<h1 className={classes.title}>Dyno Timer</h1>
			<img className={classes.logo} src={logoImgSrc} alt='Logo' />
		</div>
	);
}

export default LogoTitle;
