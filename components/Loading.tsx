'use client';

import { Box, CircularProgress } from '@mui/material';

export const Loading = () => {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				height: '100vh',
				width: '100vw',
			}}>
			<CircularProgress
				size={50}
				sx={{
					mb: 2,
				}}
			/>
			<p>Cargando...</p>
		</Box>
	);
};
