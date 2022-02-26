import TimeIcon from '@mui/icons-material/AccessTime';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import TodoListIcon from '@mui/icons-material/FormatListBulleted';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import { Stack } from '@mui/material';
import { Box } from '@mui/system';
import { signOut } from 'firebase/auth';
import { ReactNode, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { auth } from '../../configs/firebase';
import { ROUTES } from '../../constants/routes';
import { AccountContext } from '../../contexts/AccountContext';
import { getActiveKey } from '../../helpers';
import useStyles from '../../styles/NavMenu';

interface MenuItem {
	to: string;
	title: string;
	icon: ReactNode;
	activeKey: string;
}

let menuList: Array<MenuItem> = [
	{
		to: ROUTES.HOME,
		title: 'Pomodoro',
		icon: <TimeIcon />,
		activeKey: ROUTES.HOME,
	},
	{
		to: ROUTES.TODO_LIST,
		title: 'Todo List',
		icon: <TodoListIcon />,
		activeKey: ROUTES.TODO_LIST,
	},
	{
		to: ROUTES.ANALYTICS,
		title: 'Analytics',
		icon: <AnalyticsIcon />,
		activeKey: ROUTES.ANALYTICS,
	},
	{
		to: ROUTES.SETTINGS,
		title: 'Settings',
		icon: <SettingsIcon />,
		activeKey: ROUTES.SETTINGS,
	},
];

function NavMenu() {
	const classes = useStyles();
	const { isAuth } = useContext(AccountContext);
	const { pathname } = useLocation();
	const activeKey = getActiveKey(menuList, pathname);

	const onLogout = (): void => {
		signOut(auth.getAuth()).then(() => {
			window.location.reload();
		});
	};

	return (
		<Stack spacing={1} my={2} px={1.5}>
			{menuList.map((menuItem: MenuItem, index: number) => (
				<Link
					key={index}
					to={menuItem.to}
					className={`${classes.menuItem} ${
						menuItem.activeKey === activeKey ? 'active' : ''
					}`}
				>
					{menuItem.icon}
					<Box ml={2}>{menuItem.title}</Box>
				</Link>
			))}

			{isAuth && (
				<div className={classes.menuItem} onClick={onLogout}>
					<LogoutIcon />
					<Box ml={2}>Logout</Box>
				</div>
			)}
		</Stack>
	);
}

export default NavMenu;
