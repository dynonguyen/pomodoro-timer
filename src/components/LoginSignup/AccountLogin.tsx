import {
	Avatar,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Grid,
	TextField,
} from '@mui/material';
import { doc, updateDoc } from 'firebase/firestore';
import { useContext, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../configs/firebase';
import { ROUTES } from '../../constants/routes';
import { AccountContext } from '../../contexts/AccountContext';
import useStyles from '../../styles/AccountLogin';

function AccountLogin() {
	const classes = useStyles();
	const { isAuth, fullname, avt, uid } = useContext(AccountContext);
	const avtSrc = `/assets/images/avatars/${avt}.png`;
	const [showModal, setShowModal] = useState(false);
	const [avtIndex, setAvtIndex] = useState(Number(avt));
	const fullnameRef = useRef(fullname);
	const [isDisabled, setIsDisabled] = useState(false);

	const onChangeAccountSettings = async () => {
		const newFullname = fullnameRef.current.trim();
		if (newFullname === fullname && avtIndex.toString() === avt) {
			return setShowModal(false);
		}

		setIsDisabled(true);
		await updateDoc(doc(db, 'users', uid), {
			avt: avtIndex.toString(),
			fullname: newFullname,
		});

		window.location.reload();
	};

	return (
		<div className={`${classes.accountWrap} flex-center flex-col`}>
			{isAuth ? (
				<>
					<Avatar
						src={avtSrc}
						alt={fullname}
						sx={{
							width: '48px',
							height: '48px',
							mb: '0.5rem',
							cursor: 'pointer',
						}}
						onClick={() => setShowModal(true)}
					/>
					<p className={classes.name}>{fullname}</p>

					<Dialog open={showModal} onClose={() => setShowModal(false)}>
						<DialogTitle>Account Settings</DialogTitle>
						<DialogContent>
							<TextField
								autoFocus
								label='Full name'
								type='text'
								fullWidth
								variant='standard'
								defaultValue={fullname}
								onChange={(e) => (fullnameRef.current = e.target.value)}
							/>
							<Grid container spacing={2} mt={4}>
								{new Array(24).fill(1).map((_, index) => (
									<Grid key={index} item sm={2}>
										<div className='flex-center'>
											<Avatar
												src={`/assets/images/avatars/${index}.png`}
												sx={{
													width: '64px',
													height: '64px',
													cursor: 'pointer',
													border: `${
														index === avtIndex ? 'solid 3px #666' : 'none'
													}`,
												}}
												onClick={() => setAvtIndex(index)}
											/>
										</div>
									</Grid>
								))}
							</Grid>
						</DialogContent>
						<DialogActions>
							<Button
								onClick={() => setShowModal(false)}
								variant='contained'
								color='error'
							>
								Close
							</Button>
							<Button
								className={`${isDisabled ? 'disabled' : ''}`}
								onClick={onChangeAccountSettings}
								variant='contained'
								color='success'
							>
								Save
							</Button>
						</DialogActions>
					</Dialog>
				</>
			) : (
				<Link to={ROUTES.LOGIN} className={classes.loginBtn}>
					Login
				</Link>
			)}
		</div>
	);
}

export default AccountLogin;
