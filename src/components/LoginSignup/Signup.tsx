import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { auth, db, doc, setDoc } from '../../configs/firebase';
import { MAX_LEN, MIN_LEN } from '../../constants/lengths';
import otherConstants from '../../constants/others';
import { ROUTES } from '../../constants/routes';
import { userSettingDefaultValue } from '../../contexts/UserSettingContext';
import useChangeTitle from '../../hooks/useChangeTitle';
import { UserModel } from '../../models/user.model';
import { useCommonStyles } from '../../styles/commons/CommonStyle';
import useStyles from '../../styles/LoginSignup';
import CustomInput from '../Commons/CustomInput';

interface SignupFormValue {
	username: string;
	fullname: string;
	password: string;
}

interface FormErrorMsg {
	isError: boolean;
	msg?: string;
}

function signupFormValidation(formValue: SignupFormValue): FormErrorMsg {
	let { fullname, username, password } = formValue;
	[fullname, username, password] = [
		fullname.trim(),
		username.trim(),
		password.trim(),
	];
	if (!username) {
		return { isError: true, msg: 'Enter your username. Please !' };
	}
	if (!fullname) {
		return { isError: true, msg: 'Enter your full name. Please !' };
	}
	if (!password) {
		return { isError: true, msg: 'Enter your password. Please !' };
	}

	// Check the max length of fields
	if (username.length > MAX_LEN.USERNAME) {
		return {
			isError: true,
			msg: `Username must be less than ${MAX_LEN.USERNAME} characters`,
		};
	}
	if (fullname.length > MAX_LEN.FULLNAME) {
		return {
			isError: true,
			msg: `Fullname must be less than ${MAX_LEN.FULLNAME} characters`,
		};
	}
	if (password.length > MAX_LEN.PASSWORD) {
		return {
			isError: true,
			msg: `Password must be less than ${MAX_LEN.PASSWORD} characters`,
		};
	}
	if (password.length <= MIN_LEN.PASSWORD) {
		return {
			isError: true,
			msg: `Password must be greater than ${MIN_LEN.PASSWORD} characters`,
		};
	}

	return { isError: false };
}

function Signup() {
	const { buttonClass, titleClass } = useCommonStyles();
	useChangeTitle('Signup');
	const classes = useStyles();
	const [isRegistering, setIsRegistering] = useState<boolean>(false);
	const [error, setError] = useState<FormErrorMsg>({ isError: false, msg: '' });

	const inputRefs = useRef<SignupFormValue>({
		fullname: '',
		username: '',
		password: '',
	});
	const history = useHistory();

	const onSignup = async (): Promise<void> => {
		const formValue: SignupFormValue = inputRefs.current;
		const { username, password, fullname } = formValue;

		const formError: FormErrorMsg = signupFormValidation(formValue);

		if (formError.isError) {
			setError(formError);
			return;
		}

		// Create a new account
		try {
			setIsRegistering(true);
			const email = username + otherConstants.EMAIL_DOMAIN;
			const userCredential = await auth.createUserWithEmailAndPassword(
				auth.getAuth(),
				email,
				password,
			);
			const { uid } = userCredential.user;

			// create a new user
			const newUser: UserModel = {
				fullname,
				uid,
				username,
				avt: '',
			};
			setDoc(doc(db, 'users', uid), newUser);

			// create default settings for this user
			await setDoc(doc(db, 'settings', uid), userSettingDefaultValue);

			history.push(ROUTES.LOGIN);
		} catch (error: any) {
			if (error && error?.code) {
				setError({ isError: true, msg: error.code });
			} else {
				setError({ isError: true, msg: 'Signup Failed ! Try again' });
			}

			setIsRegistering(false);
		}
	};

	return (
		<Box p={4} className='box flex-center flex-col'>
			<Box className={classes.formWrap}>
				<Stack spacing={4}>
					<Typography className={titleClass} component='h3' variant='h3'>
						CREATE AN ACCOUNT
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
						onChange={(e) => (inputRefs.current.username = e.target.value)}
						autoFocus={true}
					/>

					<CustomInput
						icon={AssignmentIndIcon}
						placeholder='Full name'
						name='fullname'
						maxLength={MAX_LEN.FULLNAME}
						onChange={(e) => (inputRefs.current.fullname = e.target.value)}
						type='text'
					/>

					<CustomInput
						icon={LockIcon}
						placeholder='Password'
						type='password'
						maxLength={MAX_LEN.PASSWORD}
						onChange={(e) => (inputRefs.current.password = e.target.value)}
						name='password'
					/>

					<Button
						className={`${buttonClass} ${classes.submitBtn} ${
							isRegistering ? 'disabled' : ''
						}`}
						variant='contained'
						onClick={onSignup}
					>
						Register
					</Button>

					<Typography component='p' className={classes.redirectMessage}>
						Have an account?{' '}
						<Link to={ROUTES.LOGIN} className={classes.link}>
							Login now
						</Link>
					</Typography>
				</Stack>
			</Box>
		</Box>
	);
}

export default Signup;
