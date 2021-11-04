import TimeIcon from '@mui/icons-material/AccessTime';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import TodoListIcon from '@mui/icons-material/FormatListBulleted';
import SettingsIcon from '@mui/icons-material/Settings';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { ReactNode } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { getActiveKey } from '../../helpers';
import useStyles from '../../styles/MobileNavbar';

interface MobileMenuItem {
	label: string;
	activeKey: string;
	icon: ReactNode;
}

const menuList: Array<MobileMenuItem> = [
	{
		label: 'Pomodoro',
		activeKey: ROUTES.HOME,
		icon: <TimeIcon />,
	},
	{
		label: 'Todos',
		activeKey: ROUTES.TODO_LIST,
		icon: <TodoListIcon />,
	},
	{
		label: 'Analytics',
		activeKey: ROUTES.ANALYTICS,
		icon: <AnalyticsIcon />,
	},
	{
		label: 'Settings',
		activeKey: ROUTES.SETTINGS,
		icon: <SettingsIcon />,
	},
];

function MobileNavbar() {
	const { pathname } = useLocation();
	const activeKey = getActiveKey(menuList, pathname);
	const classes = useStyles();
	const history = useHistory();

	const handleChange = (event: React.SyntheticEvent, newActiveKey: string) => {
		history.push(newActiveKey);
	};

	return (
		<BottomNavigation
			className={classes.root}
			showLabels
			value={activeKey}
			onChange={handleChange}
		>
			{menuList.map((menuItem: MobileMenuItem, index: number) => (
				<BottomNavigationAction
					key={index}
					className={classes.actionBtn}
					label={menuItem.label}
					value={menuItem.activeKey}
					icon={menuItem.icon}
				/>
			))}
		</BottomNavigation>
	);
}

export default MobileNavbar;
