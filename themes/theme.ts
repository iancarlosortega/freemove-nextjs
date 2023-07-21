import { Poppins } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

declare module '@mui/material/Button' {
	interface ButtonPropsVariantOverrides {
		oauth: true;
		gradient: true;
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
					backgroundColor: 'var(--yellow)',
					color: 'var(--white)',
					margin: '1rem 0',
					padding: '0.5rem 1rem',
					border: 'none',
					borderRadius: '5px',
					textTransform: 'none',
					fontSize: '1rem',
					fontWeight: 400,
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					gap: '0.25rem',
					transition: 'background-color 0.2s ease-in-out',
					':hover': {
						backgroundColor: 'var(--dark-yellow)',
					},
				},
			},
			variants: [
				{
					props: { variant: 'oauth' },
					style: {
						backgroundColor: 'var(--white)',
						color: '#6a6a6a',
						gap: '0.5rem',
						border: '1px solid #d0d0d0',
						':hover': {
							backgroundColor: '#f5f5f5',
						},
					},
				},
				{
					props: { variant: 'gradient' },
					style: {
						backgroundImage:
							'linear-gradient(to right, var(--dark-yellow) 0%, var(--yellow) 50%, var(--dark-yellow) 100%)',
						backgroudnSize: '200% auto',
						boxShadow:
							'0 4px 6px rgba(50, 50, 93, .11), 0 1px 3px rgba(0, 0, 0, .08)',
						color: 'var(--white)',
						fontWeight: 700,
						gap: '0.5rem',
						fontSize: '0.85rem',
						width: '100%',
						':hover': {
							backgroundPosition: 'right center',
						},
					},
				},
				{
					props: { variant: 'gradient', color: 'success' },
					style: {
						backgroundImage:
							'linear-gradient(to right, var(--dark-green) 0%, var(--green) 50%, var(--dark-green) 100%)',
					},
				},
				{
					props: { variant: 'gradient', color: 'error' },
					style: {
						backgroundImage:
							'linear-gradient(to right, var(--dark-red) 0%, var(--red) 50%, var(--dark-red) 100%)',
					},
				},
			],
		},
	},
});
