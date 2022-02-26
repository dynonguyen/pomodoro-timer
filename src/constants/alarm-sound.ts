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
		label: 'Beep',
		src: '/src/assets/audio/alarm-sounds/beep.mp3',
	},
	{
		id: 2,
		label: 'Alarm tone',
		src: '/src/assets/audio/alarm-sounds/alarm-tone.mp3',
	},
	{
		id: 3,
		label: 'Buzzer',
		src: '/src/assets/audio/alarm-sounds/buzzer.mp3',
	},
	{
		id: 4,
		label: 'Classic Alarm',
		src: '/src/assets/audio/alarm-sounds/classic-alarm.mp3',
	},
	{
		id: 5,
		label: 'Digital beep',
		src: '/src/assets/audio/alarm-sounds/digital-beep.mp3',
	},
	{
		id: 6,
		label: 'Facility',
		src: '/src/assets/audio/alarm-sounds/facility.mp3',
	},
	{
		id: 7,
		label: 'Interface hint',
		src: '/src/assets/audio/alarm-sounds/interface-hint.mp3',
	},
	{
		id: 8,
		label: 'Rooster crowing in the morning',
		src: '/src/assets/audio/alarm-sounds/rooster-crowing-in-the-morning.mp3',
	},
	{
		id: 9,
		label: 'Security facility breach',
		src: '/src/assets/audio/alarm-sounds/security-facility-breach.mp3',
	},
	{
		id: 10,
		label: 'Short rooster crowing',
		src: '/src/assets/audio/alarm-sounds/short-rooster-crowing.mp3',
	},
	{
		id: 11,
		label: 'Street public alarm',
		src: '/src/assets/audio/alarm-sounds/street-public-alarm.mp3',
	},
];
