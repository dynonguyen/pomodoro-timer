import AutorenewIcon from '@mui/icons-material/Autorenew';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import { Box, Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from 'react';
import useStyles from '../../styles/Clock';
import { useCommonStyles } from '../../styles/commons/CommonStyle';
let intervalId: null | ReturnType<typeof setInterval> = null;

interface NewClockValue {
	second: string;
	minute: string;
	circlePercent: number;
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

function Clock() {
	const classes = useStyles();
	const { buttonClass } = useCommonStyles();

	const [run, setRun] = useState<string>('start');
	const seconds: number = 5;
	const [secondsLeft, setSecondsLeft] = useState<number>(seconds);
	const { second, minute, circlePercent } = getNewClockValue(
		secondsLeft,
		seconds,
	);

	const onPauseOrStart = (): void => {
		if (run === 'start') {
			intervalId && clearInterval(intervalId);
			intervalId = setInterval(() => {
				setSecondsLeft((preValue: number) => {
					const newSecondLeft: number = preValue - 1;
					if (newSecondLeft <= 0) {
						// Can xu ly khi time out
						alert('Time out');
						intervalId && clearInterval(intervalId);
						setRun('start');
						return 0;
					}
					return newSecondLeft;
				});
			}, 1000);
			setRun('stop');
		} else {
			intervalId && clearInterval(intervalId);
			setRun('start');
		}
	};

	const onReset = (): void => {
		if (secondsLeft !== seconds) {
			intervalId && clearInterval(intervalId);
			setRun('start');
			setSecondsLeft(seconds);
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

export default Clock;
