'use client';

import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@/themes/theme';
import { CssBaseline } from '@mui/material';

interface Props {
	children: React.ReactNode;
}

export const MuiProvider: React.FC<Props> = ({ children }) => {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	);
};
