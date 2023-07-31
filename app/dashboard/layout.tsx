'use client';

import { useState } from 'react';
import { AppBar, Box, Drawer, IconButton, Toolbar } from '@mui/material';
import { Menu, ChatBubble, Notifications, Person } from '@mui/icons-material';
import { NavbarDashboard, SideMenuDashboard } from '@/components';

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const drawerWidth = 260;

	const [mobileOpen, setMobileOpen] = useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	return (
		<Box
			sx={{
				ml: { md: `${drawerWidth}px` },
			}}>
			{/* Phone */}
			<AppBar
				position='relative'
				sx={{
					display: { sm: 'none' },
				}}>
				<Toolbar
					sx={{
						color: 'white',
						backgroundColor: '#1d273b',
						display: 'flex',
						justifyContent: 'space-between',
					}}>
					<IconButton color='inherit' onClick={handleDrawerToggle}>
						<Menu />
					</IconButton>
					<Box sx={{ flexGrow: 1 }}></Box>
					<Box display='flex' gap={1}>
						<IconButton color='inherit'>
							<ChatBubble />
						</IconButton>
						<IconButton color='inherit'>
							<Notifications />
						</IconButton>
						<IconButton color='inherit'>
							<Person />
						</IconButton>
					</Box>
				</Toolbar>
			</AppBar>
			{/* Tablet & Desktop > 600px */}
			<NavbarDashboard />
			<Box
				component='nav'
				sx={{ width: { md: drawerWidth } }}
				aria-label='mailbox folders'>
				{/* Phone Drawer */}
				<Drawer
					variant='temporary'
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
					sx={{
						display: { xs: 'block', md: 'none' },
						'& .MuiDrawer-paper': {
							boxSizing: 'border-box',
							width: drawerWidth,
						},
					}}>
					<SideMenuDashboard />
				</Drawer>

				{/* Tablet & Desktop Drawer > 600px */}
				<Drawer
					variant='permanent'
					open
					sx={{
						display: { xs: 'none', md: 'block' },
						'& .MuiDrawer-paper': {
							boxSizing: 'border-box',
							width: drawerWidth,
						},
					}}>
					<SideMenuDashboard />
				</Drawer>
			</Box>
			<Box
				component='main'
				sx={{
					padding: { xs: '1rem', lg: '1rem 2rem' },
				}}>
				{children}
			</Box>
		</Box>
	);
}
