import { createContext, ReactNode } from 'react';

interface AccountProviderProps {
  children: ReactNode;
}

interface AccountContextValue {
  isAuth: boolean;
  username: string;
  name: string;
  avt: string;
}

const defaultValue: AccountContextValue = {
  isAuth: false,
  username: 'anonymous',
  name: 'Anonymous',
  avt: '',
};

export const AccountContext = createContext<AccountContextValue>(defaultValue);

const AccountContextProvider = ({ children }: AccountProviderProps) => {
  return (
    <AccountContext.Provider value={defaultValue}>
      {children}
    </AccountContext.Provider>
  );
};

export default AccountContextProvider;
