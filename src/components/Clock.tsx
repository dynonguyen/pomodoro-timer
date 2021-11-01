import { Box, Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from 'react';
import useStyles from '../styles/Clock';

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
  const [run, setRun] = useState<string>('start');
  const seconds: number = 25 * 60;
  const [secondsLeft, setSecondsLeft] = useState<number>(seconds);
  const { second, minute, circlePercent } = getNewClockValue(
    secondsLeft,
    seconds,
  );

  const onPause = () => {
    if (run === 'start') {
      setRun('stop');
    } else {
      setRun('start');
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSecondsLeft((preValue) => preValue - 1);
    }, 1000);

    return () => {
      intervalId && clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="flex-center flex-col h-100">
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress
          className={classes.circle}
          variant="determinate"
          value={circlePercent}
          size="12rem"
          thickness={2}
        />

        <div className={classes.timeBlock}>
          <span>{minute}</span>:<span>{second}</span>
        </div>
      </Box>

      <Box mt={4} display="flex" gap={2}>
        <Button
          className={`${classes.button} ${run}`}
          variant="contained"
          onClick={onPause}
        >
          {run}
        </Button>
        <Button variant="contained" className={classes.button}>
          Reset
        </Button>
      </Box>
    </div>
  );
}

export default Clock;
