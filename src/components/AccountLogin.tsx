import { Avatar } from '@mui/material';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { AccountContext } from '../contexts/AccountContext';
import useStyles from '../styles/AccountLogin';

function AccountLogin() {
  const classes = useStyles();
  const { isAuth, name, avt } = useContext(AccountContext);

  return (
    <div className={`${classes.accountWrap} flex-center flex-col`}>
      {isAuth ? (
        <>
          <Avatar
            src={avt}
            alt={name}
            sx={{ width: '48px', height: '48px', mb: '1rem' }}
          />
          <p className={classes.name}>{name}</p>
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
