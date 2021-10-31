import React, { Suspense } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { renderRoutes, routeList } from '../configs/routeConfig';
import { ROUTES } from '../constants/routes';
import useMobile from '../hooks/useMobile';
import '../styles/css/bubble-animation.css';
import useStyles from '../styles/Home';
const Background = React.lazy(() => import('./Background'));
const DesktopNavbar = React.lazy(() => import('./DesktopNavbar'));
const MobileNavbar = React.lazy(() => import('./MobileNavbar'));

function HomePage(): JSX.Element {
  const classes = useStyles();
  const isMobile = useMobile();

  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<>Loading ...</>}>
          {!isMobile && <Background />}
          <div className={`${classes.wrapper} flex-center`}>
            <div className={classes.paper}>
              <div className="box">
                {isMobile ? <MobileNavbar /> : <DesktopNavbar />}
              </div>
              <Switch>
                {renderRoutes(routeList, false)}
                <Route>
                  <Redirect to={ROUTES.HOME} />
                </Route>
              </Switch>
            </div>
          </div>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default HomePage;
