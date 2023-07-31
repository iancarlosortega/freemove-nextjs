'use client';

import {
	Box,
	IconButton,
	InputAdornment,
	TextField,
	Typography,
} from '@mui/material';
import {
	Settings,
	Menu,
	Search,
	ChatBubble,
	Notifications,
	Person,
} from '@mui/icons-material';

export const NavbarDashboard = () => {
	return (
		<Box
			sx={{
				display: { xs: 'none', sm: 'flex' },
				justifyContent: 'space-between',
				alignItems: 'center',
				gap: '2rem',
				padding: { xs: '1rem', lg: '2rem' },
			}}>
			<Menu color='primary' sx={{ display: { md: 'none' } }} />
			<Typography
				variant='h5'
				sx={{
					color: '#1d273b',
					fontSize: '2rem',
					fontWeight: '500',
					display: { xs: 'none', lg: 'block' },
				}}>
				Bienvenido a FreeMove
			</Typography>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					gap: '1rem',
					flexGrow: 1,
					justifyContent: { lg: 'end' },
				}}>
				<TextField
					variant='outlined'
					label='Buscador'
					placeholder='Ruta de prueba...'
					size='small'
					InputProps={{
						endAdornment: (
							<InputAdornment position='end'>
								<Search />
							</InputAdornment>
						),
					}}
				/>
				<IconButton>
					<Settings
						sx={{
							color: '#A9A9A9',
						}}
					/>
				</IconButton>
			</Box>

			<Box display='flex' gap={1}>
				<IconButton
					sx={{
						color: '#A9A9A9',
					}}>
					<ChatBubble />
				</IconButton>
				<IconButton
					sx={{
						color: '#A9A9A9',
					}}>
					<Notifications />
				</IconButton>
				<IconButton
					sx={{
						color: '#A9A9A9',
					}}>
					<Person />
				</IconButton>
			</Box>
		</Box>
	);
};
