import { Avatar } from '@mui/material';
import useStyles from '../styles/Navbar';

function Navbar(): JSX.Element {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.accountWrap}>
        <Avatar
          src="https://picsum.photos/80/80"
          alt="Tuấn Nguyễn"
          className={classes.avt}
        />
      </div>
    </div>
  );
}

export default Navbar;
