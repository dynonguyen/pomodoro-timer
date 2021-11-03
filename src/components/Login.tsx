import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import { Box, Button, Stack, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import { MAX_LEN } from '../constants/lengths';
import { ROUTES } from '../constants/routes';
import { useStyleBtn } from '../styles/commons/Button';
import CustomInput from './commons/CustomInput';

function Login() {
  const { buttonClass } = useStyleBtn();
  const theme = useTheme();

  return (
    <Box p={4} className="box flex-center flex-col">
      <Typography
        sx={{
          textAlign: 'center',
          marginBottom: '2rem',
          fontWeight: 'bold',
          color: theme.palette.text.primary,
        }}
        component="h3"
        variant="h3"
      >
        LOGIN
      </Typography>
      <Box sx={{ minWidth: '20rem', maxWidth: '25rem', margin: '0 auto' }}>
        <Stack spacing={4}>
          <Typography
            component="p"
            align="center"
            p={1}
            sx={{
              color: theme.palette.error.main,
              backgroundColor: theme.palette.box,
            }}
          >
            Vui lòng nhập username
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
            icon={LockIcon}
            placeholder="Password"
            type="password"
            maxLength={MAX_LEN.PASSWORD}
            name="password"
          />
          <Button
            className={buttonClass}
            variant="contained"
            sx={{
              borderRadius: '4px',
              height: '2.5rem',
            }}
          >
            Login
          </Button>
          <Typography
            component="p"
            sx={{
              textAlign: 'center',
              fontSize: '0.9rem',
              color: theme.palette.grey[500],
            }}
          >
            Not a member?{' '}
            <Link
              to={ROUTES.SIGNUP}
              style={{ color: theme.palette.secondary.light }}
            >
              Sign up now
            </Link>
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}

export default Login;
