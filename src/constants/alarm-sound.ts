type AlarmSound = {
	id: number;
	label: string;
	src: string;
};
export const ALARM_SOUND: AlarmSound[] = [
	{
		id: 0,
		label: 'None',
		src: '',
	},
	{
		id: 1,
		label: 'Mixkit',
		src: '/src/assets/audio/alarm-sounds/mixkit-alarm-clock-beep.mp3',
	},
];
