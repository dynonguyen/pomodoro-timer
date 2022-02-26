import { useContext } from 'react';
import { ALARM_SOUND } from '../constants/alarm-sound';
import { UserSettingContext } from '../contexts/UserSettingContext';

function useAlarmSound(): HTMLAudioElement | null {
	const { alarmSoundIndex, alarmSoundVolume } = useContext(UserSettingContext);

	if (alarmSoundIndex === 0) {
		return null;
	}

	const audioSrc = ALARM_SOUND[alarmSoundIndex].src;
	const audio = new Audio(audioSrc);
	audio.volume = alarmSoundVolume / 100;
	audio.loop = true;

	return audio;
}

export default useAlarmSound;
