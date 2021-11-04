import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import { Box, Button, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { MAX_LEN } from '../constants/lengths';
import { ROUTES } from '../constants/routes';
import { useStyleBtn } from '../styles/commons/Button';
import useStyles from '../styles/LoginSignup';
import CustomInput from './commons/CustomInput';

function Signup() {
  const { buttonClass } = useStyleBtn();
  const classes = useStyles();

  return (
    <Box p={4} className="box flex-center flex-col">
      <Box className={classes.formWrap}>
        <Stack spacing={4}>
          <Typography className={classes.title} component="h3" variant="h3">
            CREATE YOUR ACCOUNT
          </Typography>

          <Typography component="p" className={classes.errorMessage}>
            Please enter your username
          </Typography>

          <CustomInput
            icon={PersonIcon}
            placeholder="Username"
            name="username"
            maxLength={MAX_LEN.USERNAME}
            type="text"
            autoFocus={true}
          />

          <CustomInput
            icon={AssignmentIndIcon}
            placeholder="Full name"
            name="fullname"
            maxLength={MAX_LEN.FULLNAME}
            type="text"
          />

          <CustomInput
            icon={LockIcon}
            placeholder="Password"
            type="password"
            maxLength={MAX_LEN.PASSWORD}
            name="password"
          />

          <Button
            className={`${buttonClass} ${classes.submitBtn}`}
            variant="contained"
          >
            Register
          </Button>

          <Typography component="p" className={classes.redirectMessage}>
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
