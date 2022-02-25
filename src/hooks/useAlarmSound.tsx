function useAlarmSound(): HTMLAudioElement {
	const audio = new Audio(
		'/src/assets/audio/alarm-sounds/mixkit-alarm-clock-beep.mp3',
	);
	audio.volume = 1;
	audio.loop = true;

	return audio;
}

export default useAlarmSound;
