import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../configs/firebase';
import otherConstants from '../constants/others';
import {
	UserSettingContextValue,
	userSettingDefaultValue,
} from './../contexts/UserSettingContext';

function getUserSettingFromLocalStorage(): UserSettingContextValue | null {
	const settingStr: string | null = localStorage.getItem(
		otherConstants.USER_SETTING_LS_KEY,
	);
	if (settingStr) {
		const userSettings: UserSettingContextValue = JSON.parse(settingStr);
		return userSettings;
	}
	return null;
}

export async function getUserSettings(
	isAuth: boolean = false,
	uid: string = '',
): Promise<UserSettingContextValue | null> {
	if (!isAuth) return getUserSettingFromLocalStorage();

	try {
		const docRef = doc(db, 'settings', uid);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			const userSettings = docSnap.data() as UserSettingContextValue;
			return userSettings;
		}
		return null;
	} catch (error) {
		return null;
	}
}

export async function updateUserSettings(
	uid: string,
	field: string,
	value: any,
) {
	if (uid) {
		const docRef = doc(db, 'settings', uid);
		updateDoc(docRef, {
			[field]: value,
		});
	}

	const settingFromLS = getUserSettingFromLocalStorage();
	if (!settingFromLS) {
		localStorage.setItem(
			otherConstants.USER_SETTING_LS_KEY,
			JSON.stringify({ ...userSettingDefaultValue, [field]: value }),
		);
	} else {
		localStorage.setItem(
			otherConstants.USER_SETTING_LS_KEY,
			JSON.stringify({ ...settingFromLS, [field]: value }),
		);
	}
}

export function setUserSettingToLS(settings: UserSettingContextValue) {
	localStorage.setItem(
		otherConstants.USER_SETTING_LS_KEY,
		JSON.stringify(settings),
	);
}
