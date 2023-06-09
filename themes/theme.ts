import { Poppins } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const poppins = Poppins({
	subsets: ['latin'],
	weight: ['300', '400', '500', '600', '700'],
});

export const theme = createTheme({
	palette: {
		primary: {
			main: '#F2AC20',
		},
	},
	typography: {
		allVariants: {
			fontFamily: poppins.style.fontFamily,
		},
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: 'none',
					fontWeight: 400,
				},
			},
		},
	},
});
