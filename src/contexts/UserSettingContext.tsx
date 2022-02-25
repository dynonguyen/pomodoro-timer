import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react';
import {
	getUserSettings,
	setUserSettingToLS,
	updateUserSettings,
} from '../helpers/user-settings';
import { AccountContext } from './AccountContext';

interface UserSettingContextProps {
	children: ReactNode | null;
}

export interface UserSettingContextValue {
	// minutes
	pomodoroTime: number;
	shortBreakTime: number;
	longBreakTime: number;

	// times
	longBreakInterval: number;

	autoCloseNotifyAfter: number; // -1: none
	autoStartBreak: boolean;
	autoCompleteTask: boolean;

	alarmSoundIndex: number; // -1: none
	alarmSoundVolume: number; // 0 -> 100
}

interface UserSettingContextMethod {
	changePomodoroTime(newValue: number): void;
}

export const userSettingDefaultValue: UserSettingContextValue = {
	pomodoroTime: 25,
	shortBreakTime: 5,
	longBreakTime: 10,
	longBreakInterval: 4,
	autoCloseNotifyAfter: -1,
	autoStartBreak: true,
	autoCompleteTask: false,
	alarmSoundIndex: -1,
	alarmSoundVolume: 50,
};

const defaultMethod: UserSettingContextMethod = {
	changePomodoroTime: () => {},
};

export const UserSettingContext = createContext<
	UserSettingContextValue & UserSettingContextMethod
>({ ...userSettingDefaultValue, ...defaultMethod });

function UserSettingProvider({ children }: UserSettingContextProps) {
	const [value, setValue] = useState<UserSettingContextValue>(
		userSettingDefaultValue,
	);
	const { isAuth, uid } = useContext(AccountContext);

	useEffect(() => {
		(async function () {
			const userSettings = await getUserSettings(isAuth, uid);
			if (userSettings) {
				setValue({ ...userSettings });
				setUserSettingToLS(userSettings);
			} else {
				setUserSettingToLS(userSettingDefaultValue);
			}
		})();
	}, [isAuth]);

	const changePomodoroTime = async (
		newValue: number = userSettingDefaultValue.pomodoroTime,
	) => {
		await updateUserSettings(uid, 'pomodoroTime', newValue);
		setValue({ ...value, pomodoroTime: newValue });
	};

	const renderValue: UserSettingContextValue & UserSettingContextMethod = {
		...value,
		changePomodoroTime,
	};

	return (
		<UserSettingContext.Provider value={renderValue}>
			{children}
		</UserSettingContext.Provider>
	);
}

export default UserSettingProvider;
