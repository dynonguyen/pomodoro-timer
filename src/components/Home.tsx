import { useTheme } from '@mui/material/styles';
import '../styles/css/bubble-animation.css';
import useStyles from '../styles/Home';
import Background from './Background';
import Navbar from './Navbar';

function HomePage(): JSX.Element {
  const classes = useStyles();
  console.log(useTheme().palette);
  return (
    <>
      <Background />
      <div className={`${classes.wrapper} flex-center`}>
        <div className={classes.paper}>
          <div className={classes.navbarWrap}>
            <Navbar />
          </div>
          <div className={classes.timerWrap}>Timer</div>
          <div className={classes.musicWrap}>Music</div>
          <div className={classes.quoteWrap}>Quote</div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
