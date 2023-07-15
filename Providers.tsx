'use client';

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@/themes/theme';
import { AuthProvider } from './context/auth';

interface Props {
	children: React.ReactNode;
}

export const Providers: React.FC<Props> = ({ children }) => {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						refetchOnWindowFocus: false, // default: true
					},
				},
			})
	);

	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<AuthProvider>{children}</AuthProvider>
			</ThemeProvider>
		</QueryClientProvider>
	);
};
