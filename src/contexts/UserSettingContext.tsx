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
	changeSettingByField(field: string, value: any): void;
}

export const userSettingDefaultValue: UserSettingContextValue = {
	pomodoroTime: 25,
	shortBreakTime: 5,
	longBreakTime: 10,
	longBreakInterval: 4,
	autoCloseNotifyAfter: -1,
	autoStartBreak: true,
	autoCompleteTask: false,
	alarmSoundIndex: 0,
	alarmSoundVolume: 50,
};

const defaultMethod: UserSettingContextMethod = {
	changeSettingByField: () => {},
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

	const changeSettingByField = async (field: string, newValue: any) => {
		await updateUserSettings(uid, field, newValue);
		setValue({ ...value, [field]: newValue });
	};

	const renderValue: UserSettingContextValue & UserSettingContextMethod = {
		...value,
		changeSettingByField,
	};

	return (
		<UserSettingContext.Provider value={renderValue}>
			{children}
		</UserSettingContext.Provider>
	);
}

export default UserSettingProvider;
