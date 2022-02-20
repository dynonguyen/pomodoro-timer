import { doc, increment, updateDoc } from 'firebase/firestore';
import { useContext, useState } from 'react';
import { db } from '../../configs/firebase';
import { CLOCK_MODE } from '../../constants/clock';
import { TaskBoxContext } from '../../contexts/TaskBoxContext';
import useStyles from '../../styles/TimerBox';
import BreakClock from './BreakClock';
import PomodoroClock from './PomodoroClock';

async function updatePomodoroTime(
	taskId: string,
	time: number = 0,
): Promise<void> {
	await updateDoc(doc(db, 'tasks', taskId), {
		pomodoroTime: increment(time),
	});
}

function TimerBox() {
	const classes = useStyles();
	const [mode, setMode] = useState<number>(CLOCK_MODE.POMODORO);
	const { taskId, toggleIsDisabled } = useContext(TaskBoxContext);

	const handleClockTimeout = () => {
		// Update pomodoro time for task
		if (taskId) {
			updatePomodoroTime(taskId, 10);
		}

		toggleIsDisabled(false);
		setMode(CLOCK_MODE.SHORT_BREAK);
	};

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
				<PomodoroClock onTimeout={handleClockTimeout} />
			) : (
				<BreakClock />
			)}
		</div>
	);
}

export default TimerBox;
