import { useTheme } from '@mui/material/styles';
import React from 'react';
import useMobile from '../hooks/useMobile';
import '../styles/css/bubble-animation.css';
import useStyles from '../styles/Home';
const Background = React.lazy(() => import('./Background'));
const DesktopNavbar = React.lazy(() => import('./DesktopNavbar'));
const MobileNavbar = React.lazy(() => import('./MobileNavbar'));

function HomePage(): JSX.Element {
  const classes = useStyles();
  const theme = useTheme();
  console.log(theme);
  const isMobile = useMobile();

  return (
    <>
      {!isMobile && <Background />}
      <div className={`${classes.wrapper} flex-center`}>
        <div className={classes.paper}>
          <div className={classes.navbarWrap}>
            {isMobile ? <MobileNavbar /> : <DesktopNavbar />}
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
