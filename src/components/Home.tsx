import React, { Suspense, useContext } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { renderRoutes, routeList } from '../configs/routeConfig';
import { ROUTES } from '../constants/routes';
import { AccountContext } from '../contexts/AccountContext';
import useMobile from '../hooks/useMobile';
import '../styles/css/bubble-animation.css';
import useStyles from '../styles/Home';
import GlobalLoading from './Commons/GlobalLoading';

const Background = React.lazy(() => import('./Background'));
const DesktopNavbar = React.lazy(() => import('./Navbar/DesktopNavbar'));
const MobileNavbar = React.lazy(() => import('./Navbar/MobileNavbar'));

function HomePage(): JSX.Element {
	const classes = useStyles();
	const isMobile = useMobile();
	const { isAuth, isLoading } = useContext(AccountContext);

	return (
		<>
			{isLoading ? (
				<GlobalLoading />
			) : (
				<BrowserRouter>
					<Suspense fallback={<GlobalLoading />}>
						{!isMobile && <Background />}
						<div className={`${classes.wrapper} flex-center`}>
							<div className={classes.paper}>
								<div className={classes.paperContent}>
									<div className={`${classes.navbarWrap} box`}>
										{isMobile ? <MobileNavbar /> : <DesktopNavbar />}
									</div>
									<Switch>
										{renderRoutes(routeList, isAuth)}
										<Route>
											<Redirect to={ROUTES.HOME} />
										</Route>
									</Switch>
								</div>
							</div>
						</div>
					</Suspense>
				</BrowserRouter>
			)}
		</>
	);
}

export default HomePage;
