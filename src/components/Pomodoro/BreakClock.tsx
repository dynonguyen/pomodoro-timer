import { useContext } from 'react';
import { BREAK_TIMEOUT_NTFY, TIMEOUT_NTFY_TITLE } from '../../constants/clock';
import { UserSettingContext } from '../../contexts/UserSettingContext';
import useAlarmSound from '../../hooks/useAlarmSound';
import ClockUI from './ClockUI';

interface BreakClockProps {
	onTimeout: () => void;
	shortMode: boolean;
}

function showWindowNotification(
	title: string = 'Message',
	options?: NotificationOptions,
): Notification | void {
	if (!window.Notification) {
		return alert("Browser doesn't support notifications");
	}

	if (Notification.permission === 'granted') {
		return new Notification(title, options);
	} else {
		Notification.requestPermission().then(function (p: NotificationPermission) {
			if (p === 'granted') {
				return new Notification(title, options);
			}
		});
	}
}

function BreakClock({ onTimeout, shortMode }: BreakClockProps) {
	const alarmSound: HTMLAudioElement | null = useAlarmSound();
	const { autoCloseNotifyAfter, shortBreakTime, longBreakTime } =
		useContext(UserSettingContext);

	const handlePomodoroTimeout = () => {
		const notification: Notification | void = showWindowNotification(
			TIMEOUT_NTFY_TITLE,
			BREAK_TIMEOUT_NTFY,
		);

		if (notification && autoCloseNotifyAfter !== -1) {
			setTimeout(() => {
				notification.close();
			}, autoCloseNotifyAfter * 1000);
		}

		if (notification && alarmSound) {
			alarmSound.play();

			notification.onclose = function () {
				alarmSound.pause();
			};
		}

		onTimeout();
	};

	return (
		<ClockUI
			onTimeout={handlePomodoroTimeout}
			time={shortMode ? shortBreakTime : longBreakTime}
			autoStart={true}
		/>
	);
}

export default BreakClock;
