import { createContext, ReactNode, useEffect, useState } from 'react';
import { auth, getFirebaseDocument } from '../configs/firebase';

interface AccountProviderProps {
	children: ReactNode;
}

interface AccountContextValue {
	isAuth: boolean;
	username: string;
	fullname: string;
	avt: string;
	uid: string;
	isLoading: boolean;
}

const defaultValue: AccountContextValue = {
	isAuth: false,
	username: 'anonymous',
	fullname: 'Anonymous',
	avt: '0',
	uid: '',
	isLoading: true,
};

export const AccountContext = createContext<AccountContextValue>(defaultValue);

const AccountContextProvider = ({ children }: AccountProviderProps) => {
	const [user, setUser] = useState<AccountContextValue>(defaultValue);

	useEffect(() => {
		const unsubscribed = auth.getAuth().onAuthStateChanged(async (account) => {
			if (account) {
				const { uid } = account;
				const userInfo = await getFirebaseDocument('users', uid);

				setUser({
					uid,
					isAuth: true,
					fullname: userInfo?.fullname || 'Anonymous',
					username: userInfo?.username || 'anonymous',
					isLoading: false,
					avt: userInfo?.avt || '0',
				});
			} else {
				setUser({ ...defaultValue, isLoading: false });
			}
		});

		return () => {
			unsubscribed();
		};
	}, []);

	return (
		<AccountContext.Provider value={user}>{children}</AccountContext.Provider>
	);
};

export default AccountContextProvider;
