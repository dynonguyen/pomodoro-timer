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
import { useContext, useEffect, useState } from 'react';
import { ALARM_SOUND } from '../../constants/alarm-sound';
import { MAX_LEN } from '../../constants/lengths';
import { UserSettingContext } from '../../contexts/UserSettingContext';
import CustomInput from '../Commons/CustomInput';

function changeInputValueWithId(inputId: string, value: number | string) {
	const input = document.getElementById(inputId) as HTMLInputElement;
	if (input) input.value = value.toString();
}

function Time() {
	const { pomodoroTime, shortBreakTime, longBreakTime, changeSettingByField } =
		useContext(UserSettingContext);

	const onPomodoroBlur = (value: string): void => {
		const newTime = Math.round(Number(value));
		if (newTime <= 0) {
			return changeSettingByField('pomodoroTime', 1);
		}
		if (newTime > MAX_LEN.POMODORO_TIME) {
			return changeSettingByField('pomodoroTime', MAX_LEN.POMODORO_TIME);
		}
		changeSettingByField('pomodoroTime', newTime);
	};

	const onShortBreakBlur = (value: string): void => {
		const newTime = Math.round(Number(value));
		if (newTime <= 0) {
			return changeSettingByField('shortBreakTime', 1);
		}
		if (newTime > MAX_LEN.SHORT_BREAK_TIME) {
			return changeSettingByField('shortBreakTime', MAX_LEN.SHORT_BREAK_TIME);
		}
		changeSettingByField('shortBreakTime', newTime);
	};

	const onLongBreakBlur = (value: string): void => {
		const newTime = Math.round(Number(value));
		if (newTime <= 0) {
			return changeSettingByField('longBreakTime', 1);
		}
		if (newTime > MAX_LEN.LONG_BREAK_TIME) {
			return changeSettingByField('longBreakTime', MAX_LEN.LONG_BREAK_TIME);
		}
		changeSettingByField('longBreakTime', newTime);
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
					onBlur={(e) => onShortBreakBlur(e.target.value)}
				/>
				<CustomInput
					id='dyno-timer-long-break'
					defaultValue={longBreakTime}
					placeholder='Long Break'
					type='number'
					onBlur={(e) => onLongBreakBlur(e.target.value)}
				/>
			</Stack>
		</Box>
	);
}

function LongBreakInterval() {
	const { longBreakInterval, changeSettingByField } =
		useContext(UserSettingContext);

	const onInputBlur = (value: string) => {
		const newTimes = Math.round(Number(value));
		if (newTimes <= 0) {
			return changeSettingByField('longBreakInterval', 1);
		}
		if (newTimes > MAX_LEN.LONG_BREAK_INTERVAL) {
			return changeSettingByField(
				'longBreakInterval',
				MAX_LEN.LONG_BREAK_INTERVAL,
			);
		}
		changeSettingByField('longBreakInterval', newTimes);
	};

	useEffect(() => {
		changeInputValueWithId('dyno-timer-long-break-interval', longBreakInterval);
		return () => {};
	}, [LongBreakInterval]);

	return (
		<Box display='flex' alignItems='center'>
			<Typography mr={2} variant='h6' component='p' color='gray'>
				Long break interval (times)?
			</Typography>
			<CustomInput
				id='dyno-timer-long-break-interval'
				type='number'
				min={1}
				max={10}
				onBlur={(e) => onInputBlur(e.target.value)}
			/>
		</Box>
	);
}

function AutoCloseNotification() {
	const { autoCloseNotifyAfter, changeSettingByField } =
		useContext(UserSettingContext);

	const onSwitchChange = (checked: boolean = false) => {
		if (!checked) {
			return changeSettingByField('autoCloseNotifyAfter', -1);
		}
		changeSettingByField('autoCloseNotifyAfter', 1);
	};

	const onInputBlur = (value: string | number) => {
		const newSeconds = Math.round(Number(value));
		if (newSeconds <= 0) {
			return changeSettingByField('autoCloseNotifyAfter', -1);
		}
		if (newSeconds > MAX_LEN.AUTO_CLOSE_NTFY_TIME) {
			return changeSettingByField(
				'autoCloseNotifyAfter',
				MAX_LEN.AUTO_CLOSE_NTFY_TIME,
			);
		}
		changeSettingByField('autoCloseNotifyAfter', newSeconds);
	};

	useEffect(() => {
		changeInputValueWithId('close-notify-after', autoCloseNotifyAfter);
	}, [autoCloseNotifyAfter]);

	return (
		<Box display='flex' alignItems='center'>
			<Typography variant='h6' component='p' color='gray'>
				Auto close notification after (seconds)?
			</Typography>
			<Switch
				id='auto-close-notify'
				color='primary'
				size='medium'
				checked={autoCloseNotifyAfter !== -1}
				onChange={(e, checked) => onSwitchChange(checked)}
			/>
			{autoCloseNotifyAfter !== -1 && (
				<CustomInput
					id='close-notify-after'
					type='number'
					min={1}
					max={10}
					onBlur={(e) => onInputBlur(e.target.value)}
				/>
			)}
		</Box>
	);
}

function AutoStartBreak() {
	const { changeSettingByField, autoStartBreak } =
		useContext(UserSettingContext);
	const onSwitchChange = (checked: boolean = false) => {
		changeSettingByField('autoStartBreak', checked);
	};
	return (
		<Box display='flex'>
			<Typography variant='h6' component='p' color='gray'>
				Auto start breaks?
			</Typography>
			<Switch
				color='primary'
				size='medium'
				checked={autoStartBreak}
				onChange={(e, checked) => onSwitchChange(checked)}
			/>
		</Box>
	);
}

function AutoCompleteTask() {
	const { autoCompleteTask, changeSettingByField } =
		useContext(UserSettingContext);

	const onSwitchChange = (checked: boolean = false) => {
		changeSettingByField('autoCompleteTask', checked);
	};

	return (
		<Box display='flex' alignItems='center'>
			<Typography variant='h6' component='p' color='gray'>
				Autocomplete task when timeout?
			</Typography>
			<Switch
				color='primary'
				size='medium'
				checked={autoCompleteTask}
				onChange={(e, checked) => onSwitchChange(checked)}
			/>
		</Box>
	);
}

function AlarmSound() {
	const { alarmSoundIndex, alarmSoundVolume, changeSettingByField } =
		useContext(UserSettingContext);
	const [volume, setVolume] = useState<number>(alarmSoundVolume);

	const onAlarmChange = (value: number) => {
		if (value !== 0) {
			const audio = new Audio(ALARM_SOUND[value].src);
			audio.volume = volume / 100;
			audio.play();
			setTimeout(() => {
				audio.src = '';
			}, 3000);
		}

		changeSettingByField('alarmSoundIndex', value);
	};

	const onAlarmVolumeChange = (value: number) => {
		changeSettingByField('alarmSoundVolume', value);
	};

	return (
		<Stack spacing={1}>
			<Box display='flex' alignItems='center'>
				<Typography variant='h6' component='p' color='gray' mr={2}>
					Alarm Sound?
				</Typography>
				<Select
					placeholder='Sound'
					size='small'
					value={alarmSoundIndex}
					onChange={(e) => onAlarmChange(Number(e.target.value))}
					sx={{ minWidth: 200 }}
				>
					{ALARM_SOUND.map((alarm) => (
						<MenuItem key={alarm.id} value={alarm.id}>
							{alarm.label}
						</MenuItem>
					))}
				</Select>
			</Box>

			{alarmSoundIndex !== 0 && (
				<Stack spacing={2} direction='row' sx={{ mb: 1 }} alignItems='center'>
					<VolumeDown sx={{ color: '#555' }} />
					<Slider
						value={volume}
						onChange={(e, value) => setVolume(Number(value))}
						onChangeCommitted={(e, value) => onAlarmVolumeChange(Number(value))}
						min={0}
						max={100}
						valueLabelDisplay='auto'
					/>
					<VolumeUp sx={{ color: '#555' }} />
				</Stack>
			)}
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
