import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';
import {
	Box,
	MenuItem,
	Select,
	Slider,
	Stack,
	Switch,
	Typography,
} from '@mui/material';
import { useContext, useEffect } from 'react';
import { MAX_LEN } from '../../constants/lengths';
import { UserSettingContext } from '../../contexts/UserSettingContext';
import CustomInput from '../Commons/CustomInput';

function changeInputValueWithId(inputId: string, value: number | string) {
	const input = document.getElementById(inputId) as HTMLInputElement;
	if (input) input.value = value.toString();
}

function Time() {
	const { pomodoroTime, shortBreakTime, longBreakTime, changePomodoroTime } =
		useContext(UserSettingContext);

	const onPomodoroBlur = (value: string): void => {
		const newTime = Math.round(Number(value));
		if (newTime <= 0) {
			return changePomodoroTime(1);
		}
		if (newTime > MAX_LEN.POMODORO_TIME) {
			return changePomodoroTime(MAX_LEN.POMODORO_TIME);
		}
		changePomodoroTime(newTime);
	};

	useEffect(() => {
		changeInputValueWithId('dyno-timer-pomodoro', pomodoroTime);
		changeInputValueWithId('dyno-timer-short-break', shortBreakTime);
		changeInputValueWithId('dyno-timer-long-break', longBreakTime);
	}, [pomodoroTime, shortBreakTime, longBreakTime]);

	return (
		<Box>
			<Typography variant='h6' component='p' color='gray'>
				Time (minutes)
			</Typography>
			<Stack direction='row' spacing={2} mt={1}>
				<CustomInput
					id='dyno-timer-pomodoro'
					placeholder='Pomodoro'
					type='number'
					defaultValue={pomodoroTime}
					onBlur={(e) => onPomodoroBlur(e.target.value)}
				/>
				<CustomInput
					id='dyno-timer-short-break'
					defaultValue={shortBreakTime}
					placeholder='Short Break'
					type='number'
				/>
				<CustomInput
					id='dyno-timer-long-break'
					defaultValue={longBreakTime}
					placeholder='Long Break'
					type='number'
				/>
			</Stack>
		</Box>
	);
}

function LongBreakInterval() {
	return (
		<Box display='flex' alignItems='center'>
			<Typography mr={2} variant='h6' component='p' color='gray'>
				Long break interval (times)?
			</Typography>
			<CustomInput type='number' min={1} max={10} />
		</Box>
	);
}

function AutoCloseNotification() {
	return (
		<Box display='flex' alignItems='center'>
			<Typography variant='h6' component='p' color='gray'>
				Auto close notification after (seconds)?
			</Typography>
			<Switch color='primary' size='medium' />
			<CustomInput type='number' min={1} max={10} />
		</Box>
	);
}

function AutoStartBreak() {
	return (
		<Box display='flex'>
			<Typography variant='h6' component='p' color='gray'>
				Auto start breaks?
			</Typography>
			<Switch color='primary' size='medium' />
		</Box>
	);
}

function AutoCompleteTask() {
	return (
		<Box display='flex' alignItems='center'>
			<Typography variant='h6' component='p' color='gray'>
				Autocomplete task when timeout?
			</Typography>
			<Switch color='primary' size='medium' />
		</Box>
	);
}

function AlarmSound() {
	return (
		<Stack spacing={1}>
			<Box display='flex' alignItems='center'>
				<Typography variant='h6' component='p' color='gray' mr={2}>
					Alarm Sound?
				</Typography>
				<Select
					placeholder='Sound'
					value={10}
					size='small'
					sx={{ minWidth: 200 }}
				>
					<MenuItem value={10}>None</MenuItem>
					<MenuItem value={20}>Twenty</MenuItem>
					<MenuItem value={30}>Thirty</MenuItem>
				</Select>
			</Box>

			<Stack spacing={2} direction='row' sx={{ mb: 1 }} alignItems='center'>
				<VolumeDown sx={{ color: '#555' }} />
				<Slider aria-label='Volume' value={10} />
				<VolumeUp sx={{ color: '#555' }} />
			</Stack>
		</Stack>
	);
}

function Settings() {
	return (
		<Box className='box'>
			{/* Title */}
			<Typography
				variant='h3'
				pt={2}
				component='h1'
				fontWeight={500}
				textAlign='center'
			>
				Dyno Timer Settings
			</Typography>

			{/* content */}
			<Stack px={4} py={2} spacing={2}>
				<Time />
				<LongBreakInterval />
				<AutoCloseNotification />
				<AutoStartBreak />
				<AutoCompleteTask />
				<AlarmSound />
			</Stack>
		</Box>
	);
}

export default Settings;
