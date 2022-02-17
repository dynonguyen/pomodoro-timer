import { createContext, ReactNode, useEffect, useState } from 'react';
import { auth, getFirebaseDocument } from '../configs/firebase';

interface AccountProviderProps {
	children: ReactNode;
}

interface AccountContextValue {
	isAuth: boolean;
	username: string;
	fullname: string;
	avt?: string;
	uid: string;
}

const defaultValue: AccountContextValue = {
	isAuth: false,
	username: 'anonymous',
	fullname: 'Anonymous',
	avt: '',
	uid: '',
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
				});
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
