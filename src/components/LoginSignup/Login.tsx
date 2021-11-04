import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import { Box, Button, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { MAX_LEN } from '../../constants/lengths';
import { ROUTES } from '../../constants/routes';
import { useCommonStyles } from '../../styles/commons/CommonStyle';
import useStyles from '../../styles/LoginSignup';
import CustomInput from '../Commons/CustomInput';

function Login() {
	const { buttonClass, titleClass } = useCommonStyles();
	const classes = useStyles();

	return (
		<Box p={4} className='box flex-center flex-col'>
			<Box className={classes.formWrap}>
				<Stack spacing={4}>
					<Typography className={titleClass} component='h3' variant='h3'>
						LOGIN
					</Typography>

					<Typography component='p' className={classes.errorMessage}>
						Please enter your username
					</Typography>

					<CustomInput
						icon={PersonIcon}
						placeholder='Username'
						name='username'
						maxLength={MAX_LEN.USERNAME}
						type='text'
						autoFocus={true}
					/>

					<CustomInput
						icon={LockIcon}
						placeholder='Password'
						type='password'
						maxLength={MAX_LEN.PASSWORD}
						name='password'
					/>

					<Button
						className={`${buttonClass} ${classes.submitBtn}`}
						variant='contained'
					>
						Login
					</Button>

					<Typography component='p' className={classes.redirectMessage}>
						Not a member?{' '}
						<Link to={ROUTES.SIGNUP} className={classes.link}>
							Sign up now
						</Link>
					</Typography>
				</Stack>
			</Box>
		</Box>
	);
}

export default Login;
