import { useState } from 'react';
import { CLOCK_MODE } from '../../constants/clock';
import useStyles from '../../styles/TimerBox';
import BreakClock from './BreakClock';
import PomodoroClock from './PomodoroClock';

function TimerBox() {
	const classes = useStyles();
	const [mode, setMode] = useState<number>(CLOCK_MODE.POMODORO);

	return (
		<div className={classes.root}>
			<div className='flex-center'>
				<p
					className={`${classes.modeBtn} ${
						mode === CLOCK_MODE.POMODORO ? 'active' : ''
					}`}
					onClick={() => setMode(CLOCK_MODE.POMODORO)}
				>
					Pomodoro
				</p>
				<p
					className={`${classes.modeBtn} ${
						mode === CLOCK_MODE.SHORT_BREAK ? 'active' : ''
					}`}
					onClick={() => setMode(CLOCK_MODE.SHORT_BREAK)}
				>
					Short Break
				</p>
				<p
					className={`${classes.modeBtn} ${
						mode === CLOCK_MODE.LONG_BREAK ? 'active' : ''
					}`}
					onClick={() => setMode(CLOCK_MODE.LONG_BREAK)}
				>
					Long Break
				</p>
			</div>

			{mode === CLOCK_MODE.POMODORO ? (
				<PomodoroClock onTimeout={() => setMode(CLOCK_MODE.SHORT_BREAK)} />
			) : (
				<BreakClock />
			)}
		</div>
	);
}

export default TimerBox;
