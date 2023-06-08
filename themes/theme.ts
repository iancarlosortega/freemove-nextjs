import { Poppins } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const poppins = Poppins({
	subsets: ['latin'],
	weight: ['300', '400', '500', '600', '700'],
});

export const theme = createTheme({
	typography: {
		allVariants: {
			fontFamily: poppins.style.fontFamily,
		},
	},
});
