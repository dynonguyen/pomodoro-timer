import React from 'react';
import TaskBoxProvider from '../../contexts/TaskBoxContext';
import useMobile from '../../hooks/useMobile';
import useStyles from '../../styles/Pomodoro';
import LogoTitle from '../Commons/LogoTitle';
import Quote from './Quote';
import TimerBox from './TimerBox';
const Music = React.lazy(() => import('./Music'));
const TaskBox = React.lazy(() => import('./TaskBox'));

function Pomodoro() {
	const classes = useStyles();
	const isTablet = useMobile('sm');
	const isMobile = useMobile('xs');

	return (
		<TaskBoxProvider>
			<div className={classes.root}>
				<div className={`${classes.timerWrap} box d-flex flex-col`}>
					{isMobile && <LogoTitle />}
					<TimerBox />
				</div>

				{!isTablet && (
					<div className={`${classes.musicWrap} box`}>
						<Music />
					</div>
				)}

				{!isTablet && (
					<div className={`${classes.taskWrap} box`}>
						<TaskBox />
					</div>
				)}

				<div className={`${classes.quoteWrap} box`}>
					<Quote />
				</div>
			</div>
		</TaskBoxProvider>
	);
}

export default Pomodoro;
