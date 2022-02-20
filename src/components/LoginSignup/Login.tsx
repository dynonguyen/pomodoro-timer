import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import { Box, Button, Stack, Typography } from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useContext, useRef, useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { auth } from '../../configs/firebase';
import { MAX_LEN } from '../../constants/lengths';
import otherConstants from '../../constants/others';
import { ROUTES } from '../../constants/routes';
import { AccountContext } from '../../contexts/AccountContext';
import useChangeTitle from '../../hooks/useChangeTitle';
import { useCommonStyles } from '../../styles/commons/CommonStyle';
import useStyles from '../../styles/LoginSignup';
import CustomInput from '../Commons/CustomInput';

interface SigninFormValue {
	username: string;
	password: string;
}

function Login() {
	const { buttonClass, titleClass } = useCommonStyles();
	useChangeTitle('Login');
	const classes = useStyles();
	const [error, setError] = useState({ isError: false, msg: '' });
	const formValues = useRef<SigninFormValue>({ username: '', password: '' });
	const [isSigning, setIsSigning] = useState<boolean>(false);
	const history = useHistory();
	const { isAuth } = useContext(AccountContext);

	const onLogin = async (): Promise<void> => {
		const { username, password } = formValues.current;

		if (!username.trim() && !password.trim()) {
			setError({ isError: true, msg: 'Username or password is required !' });
			return;
		}

		setIsSigning(true);
		const email = username + otherConstants.EMAIL_DOMAIN;
		try {
			const userCredential = await signInWithEmailAndPassword(
				auth.getAuth(),
				email,
				password,
			);
			if (userCredential) {
				history.push('/');
			}
		} catch (err: any) {
			if (err?.code) {
				setError({ isError: true, msg: err.code });
			}
			setIsSigning(false);
		}
	};

	return (
		<>
			{isAuth ? (
				<Redirect to='/' />
			) : (
				<Box p={4} className='box flex-center flex-col'>
					<Box className={classes.formWrap}>
						<Stack spacing={4}>
							<Typography className={titleClass} component='h3' variant='h3'>
								LOGIN
							</Typography>

							{error.isError && (
								<Typography component='p' className={classes.errorMessage}>
									{error.msg}
								</Typography>
							)}

							<CustomInput
								icon={PersonIcon}
								placeholder='Username'
								name='username'
								maxLength={MAX_LEN.USERNAME}
								type='text'
								autoFocus={true}
								onChange={(e) => (formValues.current.username = e.target.value)}
							/>

							<CustomInput
								icon={LockIcon}
								placeholder='Password'
								type='password'
								maxLength={MAX_LEN.PASSWORD}
								name='password'
								onChange={(e) => (formValues.current.password = e.target.value)}
							/>

							<Button
								className={`${buttonClass} ${classes.submitBtn} ${
									isSigning ? 'disabled' : ''
								}`}
								variant='contained'
								onClick={onLogin}
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
			)}
		</>
	);
}

export default Login;
