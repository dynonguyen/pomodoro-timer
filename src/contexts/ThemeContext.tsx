import { PaletteMode } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createContext, ReactNode, useState } from 'react';
import { commonThemes, desginPaletteWithMode } from '../configs/theme';

interface ThemeContextProviderProps {
	children: ReactNode;
}

interface ThemeContextValue {
	mode: PaletteMode;
	toggleThemeMode: (mode: PaletteMode) => void;
}

const defaultTheme: ThemeContextValue = {
	mode: 'light',
	toggleThemeMode: () => {},
};

export const ThemeContext = createContext<ThemeContextValue>(defaultTheme);

const ThemeContextProvider = ({ children }: ThemeContextProviderProps) => {
	const [mode, setMode] = useState(defaultTheme.mode);

	const toggleThemeMode = (newMode: PaletteMode) => setMode(newMode);

	const themeContextData = { mode, toggleThemeMode };

	const palette = desginPaletteWithMode(mode);
	const theme = createTheme({ ...palette, ...commonThemes });

	return (
		<ThemeContext.Provider value={themeContextData}>
			<ThemeProvider theme={theme}>{children}</ThemeProvider>
		</ThemeContext.Provider>
	);
};

export default ThemeContextProvider;
