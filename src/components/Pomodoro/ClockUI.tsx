import AutorenewIcon from '@mui/icons-material/Autorenew';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import { Box, Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useContext, useEffect, useState } from 'react';
import { TaskBoxContext } from '../../contexts/TaskBoxContext';
import { changeAppTitle } from '../../helpers';
import useStyles from '../../styles/Clock';
import { useCommonStyles } from '../../styles/commons/CommonStyle';

let intervalId: null | ReturnType<typeof setInterval> = null;

interface NewClockValue {
	second: string;
	minute: string;
	circlePercent: number;
}

interface ClockUIProps {
	time: number; // minutes
	autoStart: boolean;
	onTimeout: () => void;
}

function getNewClockValue(
	secondsLeft: number = 0,
	totalSecond: number = 0,
): NewClockValue {
	const circlePercent: number =
		100 - Math.round(((secondsLeft - totalSecond) / totalSecond) * 100);
	const minute = `0${~~(secondsLeft / 60)}`.slice(-2);
	const second = `0${secondsLeft % 60}`.slice(-2);

	return { second, minute, circlePercent };
}

function ClockUI(props: ClockUIProps) {
	const { onTimeout, time, autoStart } = props;
	const classes = useStyles();
	const { buttonClass } = useCommonStyles();
	const seconds: number = time * 60;
	const { toggleIsDisabled, isDisabled: isTaskBoxDisabled } =
		useContext(TaskBoxContext);

	const [run, setRun] = useState<string>('start');
	const [secondsRemaining, setSecondsRemaining] = useState<number>(seconds);
	const { second, minute, circlePercent } = getNewClockValue(
		secondsRemaining,
		seconds,
	);

	// Check timeout
	useEffect(() => {
		if (secondsRemaining <= 0) {
			setRun('start');
			onTimeout();
			intervalId && clearInterval(intervalId);
		}
		changeAppTitle(`Pomodoro ${minute}:${second}`);
	}, [secondsRemaining]);

	useEffect(() => {
		if (autoStart) {
			onPauseOrStart();
		}

		return () => {
			intervalId && clearInterval(intervalId);
		};
	}, []);

	useEffect(() => {
		onReset();
	}, [time]);

	const onPauseOrStart = (): void => {
		if (run === 'start') {
			if (!isTaskBoxDisabled) {
				toggleIsDisabled(true);
			}

			intervalId && clearInterval(intervalId);
			intervalId = setInterval(() => {
				setSecondsRemaining((preValue: number) => preValue - 1);
			}, 1000);

			setRun('stop');
		} else {
			intervalId && clearInterval(intervalId);
			changeAppTitle(`Pause ${minute}:${second}`);
			setRun('start');
		}
	};

	const onReset = (): void => {
		if (secondsRemaining !== seconds) {
			intervalId && clearInterval(intervalId);
			setRun('start');
			setSecondsRemaining(seconds);
			if (isTaskBoxDisabled) {
				toggleIsDisabled(false);
			}
		}
	};

	return (
		<div className='flex-center flex-col flex-grow-1'>
			<Box sx={{ position: 'relative', display: 'inline-flex' }}>
				<CircularProgress
					className={classes.circle}
					variant='determinate'
					value={circlePercent}
					size='12rem'
					thickness={2}
				/>

				<div className={classes.timeBlock}>
					<span>{minute}</span>:<span>{second}</span>
				</div>
			</Box>

			<Box mt={6} display='flex'>
				<Button
					className={`${buttonClass} ${run}`}
					variant='contained'
					onClick={onPauseOrStart}
					sx={{ marginRight: '1rem' }}
					endIcon={run === 'start' ? <PlayArrowIcon /> : <StopIcon />}
				>
					{run}
				</Button>
				<Button
					variant='contained'
					className={`${buttonClass} reset`}
					endIcon={<AutorenewIcon />}
					onClick={onReset}
				>
					Reset
				</Button>
			</Box>
		</div>
	);
}

export default ClockUI;
