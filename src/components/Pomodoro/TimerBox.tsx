import { useState } from 'react';
import useStyles from '../../styles/TimerBox';
import Clock from './Clock';

enum MODE {
	POMODORO,
	BREAK,
}

function TimerBox() {
	const classes = useStyles();
	const [mode, setMode] = useState<number>(MODE.POMODORO);

	return (
		<div className={classes.root}>
			<div className='flex-center'>
				<p
					className={`${classes.modeBtn} ${
						mode === MODE.POMODORO ? 'active' : ''
					}`}
					onClick={() => setMode(MODE.POMODORO)}
				>
					Pomodoro
				</p>
				<p
					className={`${classes.modeBtn} ${
						mode === MODE.BREAK ? 'active' : ''
					}`}
					onClick={() => setMode(MODE.BREAK)}
				>
					Break
				</p>
			</div>

			<Clock />
		</div>
	);
}

export default TimerBox;
