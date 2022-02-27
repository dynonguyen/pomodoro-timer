import React, { ReactNode } from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
import Analytic from '../components/Analytic';
import Login from '../components/LoginSignup/Login';
import Pomodoro from '../components/Pomodoro/Pomodoro';
import Settings from '../components/Settings';
import { ROUTES } from '../constants/routes';
const Signup = React.lazy(() => import('../components/LoginSignup/Signup'));
const TodoList = React.lazy(() => import('../components/TodoList/TodoList'));

interface RouteConfig {
	path: string;
	exact?: boolean;
	isProtect?: boolean;
	render?: (props: RouteComponentProps<any>) => ReactNode;
}

export const routeList: Array<RouteConfig> = [
	{
		path: ROUTES.HOME,
		exact: true,
		isProtect: false,
		render: () => <Pomodoro />,
	},
	{
		path: ROUTES.LOGIN,
		exact: true,
		isProtect: false,
		render: () => <Login />,
	},
	{
		path: ROUTES.SIGNUP,
		exact: true,
		isProtect: false,
		render: () => <Signup />,
	},
	{
		path: ROUTES.SETTINGS,
		exact: true,
		isProtect: false,
		render: () => <Settings />,
	},
	{
		path: ROUTES.TODO_LIST,
		exact: true,
		isProtect: true,
		render: () => <TodoList />,
	},
	{
		path: ROUTES.ANALYTICS,
		exact: true,
		isProtect: true,
		render: () => <Analytic />,
	},
];

export const renderRoutes = (
	routeList: Array<RouteConfig>,
	isAuth: boolean = false,
) => {
	return routeList.map((route: RouteConfig, index: number) => {
		const { path, exact, isProtect, render } = route;
		const loginComponent = () => <Login />;
		const componentRendered = !isProtect
			? render
			: isAuth
			? render
			: loginComponent;

		return (
			<Route path={path} key={index} exact={exact} render={componentRendered} />
		);
	});
};
