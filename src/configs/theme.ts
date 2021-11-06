import { PaletteMode } from '@mui/material';

declare module '@mui/material/styles' {
	interface Palette {
		box?: string;
		mainBackground?: string;
		input?: {
			iconBg: string;
			inputBg: string;
			textColor?: string;
			placeholderColor?: string;
		};
	}
	interface PaletteOptions {
		box?: string;
		mainBackground?: string;
		input?: {
			iconBg: string;
			inputBg: string;
			textColor?: string;
			placeholderColor?: string;
		};
	}
}

declare module '@mui/system' {
	interface Shape {
		btnBorderRadius?: number | string;
	}
}

export const commonThemes = {
	breakpoints: {
		values: {
			mb: 375,
			xxs: 480,
			xs: 576,
			sm: 776,
			md: 992,
			lg: 1200,
			xl: 1140,
			xxl: 1536,
		},
	},
	shape: {
		borderRadius: 16,
		btnBorderRadius: 8,
	},
	typography: {
		fontFamily: 'Mali',
		h3: {
			fontSize: '1.75rem',
			fontWeight: 600,
		},
	},
	transitions: {
		easing: {
			easeInOut: 'all 0.35s',
		},
	},
	spacing: (factor: number) => `${0.5 * factor}rem`,
};

export const desginPaletteWithMode = (mode: PaletteMode) => ({
	palette: {
		mode,
		action: {
			hover: 'rgba(0,0,0,0.1)',
		},
		tonalOffset: 0.25,
		...(mode === 'light'
			? {
					primary: {
						main: '#84d26f',
						dark: '#3ca040',
						light: '#abe088',
					},
					secondary: {
						main: '#ff514f',
						dark: '#eb3a38',
						light: '#ff6563',
					},
					mainBackground: '#c8ecbe',
					background: {
						paper: '#eaf6ec',
						default: '#ffffff',
					},
					text: {
						primary: '#666666',
						secondary: '#ffffff',
					},
					box: '#e9f5e9',
					input: {
						iconBg: '#b6d3bb',
						inputBg: '#eaf6ec',
					},
			  }
			: {}),
	},
});
