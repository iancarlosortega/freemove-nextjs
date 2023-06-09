import { Poppins } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

declare module '@mui/material/Button' {
	interface ButtonPropsVariantOverrides {
		primary: true;
		oauth: true;
	}
}

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
			variants: [
				{
					props: { variant: 'primary' },
					style: {
						margin: '1rem 0',
						backgroundColor: 'var(--yellow)',
						color: 'var(--white)',
						border: 'none',
						borderRadius: '5px',
						padding: '0.5rem 1rem',
						fontSize: '1rem',
						transition: 'background-color 0.2s ease-in-out',
						':hover': {
							backgroundColor: 'var(--dark-yellow)',
						},
					},
				},
				{
					props: { variant: 'oauth' },
					style: {
						margin: '1rem 0',
						backgroundColor: 'var(--white)',
						color: '#6a6a6a',
						fontSize: '1rem',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						gap: '0.5rem',
						border: '1px solid #d0d0d0',
						borderRadius: '5px',
						padding: '0.5rem 1rem',
						transition: 'background-color 0.2s ease-in-out',
						':hover': {
							backgroundColor: '#f5f5f5',
						},
					},
				},
			],
		},
	},
});
