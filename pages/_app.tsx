import type { AppProps } from 'next/app';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import '@styles/globals.css';

const theme = createTheme({
	palette: {
		primary: {
			main: '#1565c0',
		},
		secondary: {
			main: '#f57c00',
		},
		background: {
			default: '#f4f7fb',
			paper: '#ffffff',
		},
	},
	shape: {
		borderRadius: 14,
	},
	typography: {
		fontFamily:
			'"Inter", "Avenir Next", "Avenir", "Segoe UI", "Helvetica Neue", "Helvetica", "Arial", sans-serif',
		h4: {
			fontWeight: 700,
			letterSpacing: '-0.02em',
		},
		h5: {
			fontWeight: 700,
			letterSpacing: '-0.01em',
		},
		h6: {
			fontWeight: 600,
		},
		button: {
			textTransform: 'none',
			fontWeight: 600,
		},
	},
	components: {
		MuiCard: {
			styleOverrides: {
				root: {
					border: '1px solid #e3eaf3',
					boxShadow: '0 12px 28px -22px rgba(20, 35, 60, 0.45)',
				},
			},
		},
		MuiButton: {
			defaultProps: {
				disableElevation: true,
			},
			styleOverrides: {
				root: {
					borderRadius: 10,
				},
			},
		},
	},
});

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Component {...pageProps} />
		</ThemeProvider>
	);
}
export default MyApp;
