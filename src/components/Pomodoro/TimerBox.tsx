import {
	addDoc,
	collection,
	doc,
	increment,
	updateDoc,
} from 'firebase/firestore';
import { useContext, useState } from 'react';
import { db } from '../../configs/firebase';
import { CLOCK_MODE } from '../../constants/clock';
import { AccountContext } from '../../contexts/AccountContext';
import { TaskBoxContext } from '../../contexts/TaskBoxContext';
import { UserSettingContext } from '../../contexts/UserSettingContext';
import { PomodoroModel } from '../../models/pomodoro.model';
import useStyles from '../../styles/TimerBox';
import BreakClock from './BreakClock';
import PomodoroClock from './PomodoroClock';
let breakTimeCounter = 0;

function TimerBox() {
	const classes = useStyles();
	const [mode, setMode] = useState<number>(CLOCK_MODE.POMODORO);
	const { isAuth, uid } = useContext(AccountContext);
	const { taskId, toggleIsDisabled } = useContext(TaskBoxContext);
	const { autoCompleteTask, autoStartBreak, pomodoroTime, longBreakInterval } =
		useContext(UserSettingContext);

	const handleClockTimeout = () => {
		// Update pomodoro time for task
		if (taskId) {
			if (autoCompleteTask) {
				updateDoc(doc(db, 'tasks', taskId), {
					isCompleted: true,
				});
			}
			updateDoc(doc(db, 'tasks', taskId), {
				pomodoroTime: increment(pomodoroTime),
			});
		}

		// Add pomodoro for user
		if (isAuth) {
			const newPomodoro: PomodoroModel = {
				uid,
				createdDate: new Date().toString(),
				time: pomodoroTime,
				taskId,
			};
			addDoc(collection(db, 'pomodoros'), newPomodoro);
		}

		toggleIsDisabled(false);
		if (autoStartBreak) {
			if (breakTimeCounter === longBreakInterval) {
				setMode(CLOCK_MODE.LONG_BREAK);
				breakTimeCounter = 0;
				return;
			}
			breakTimeCounter++;
			setMode(CLOCK_MODE.SHORT_BREAK);
		}
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
				<BreakClock
					onTimeout={() => setMode(CLOCK_MODE.POMODORO)}
					shortMode={mode === CLOCK_MODE.SHORT_BREAK}
				/>
			)}
		</div>
	);
}

export default TimerBox;
