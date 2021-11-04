import React, { ReactNode } from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
import Login from '../components/Login';
import Pomodoro from '../components/Pomodoro';
import { ROUTES } from '../constants/routes';
const Signup = React.lazy(() => import('../components/Signup'));

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
    exact: false,
    isProtect: false,
    render: () => <div>Settings</div>,
  },
  {
    path: ROUTES.TODO_LIST,
    exact: true,
    isProtect: true,
    render: () => <div>Todo List</div>,
  },
  {
    path: ROUTES.ANALYTICS,
    exact: true,
    isProtect: true,
    render: () => <div>ANALYTICS</div>,
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
