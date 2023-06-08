'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from '@mui/material';
import {
	Apartment,
	Menu,
	HealthAndSafety,
	MiscellaneousServices,
	AccountTree,
} from '@mui/icons-material';
import styles from './Navbar.module.css';

export const Navbar = () => {
	const pathname = usePathname();
	const style = {
		backgroundColor: pathname === '/' ? 'transparent' : 'var(--dark-blue)',
	};

	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<>
			<nav className={styles.navbar} style={style}>
				<Link href='/'>
					<Image
						src='/assets/logo-white.png'
						width={300}
						height={90}
						alt='FreeMove Logo'
					/>
				</Link>
				<ul className={styles.list}>
					<li className={styles.listItem}>
						<a href='#ciudad'>Ciudad</a>
					</li>
					<li className={styles.listItem}>
						<a href='#salud'>Salud</a>
					</li>
					<li className={styles.listItem}>
						<a href='#servicios'>Servicios</a>
					</li>
					<li className={styles.listItem}>
						<a href='#proceso'>Proceso</a>
					</li>
					<li>
						<Link href='/dashboard' className={styles.btnDashboard}>
							Registro/Ingreso
						</Link>
					</li>
				</ul>
			</nav>

			<nav className={styles.navbarPhone} style={style}>
				<ul>
					<li>
						<Link href='/'>
							<Image
								src='/assets/logo-white.png'
								width={170}
								height={120}
								alt='FreeMove Logo'
							/>
						</Link>
					</li>
					<li>
						<button onClick={() => setIsMenuOpen(true)}>
							<Menu />
						</button>
					</li>
				</ul>
			</nav>
			<Drawer
				onBackdropClick={() => setIsMenuOpen(false)}
				open={isMenuOpen}
				anchor='left'
				sx={{
					backdropFilter: 'blur(4px)',
					transition: 'all 0.5s ease-out',
				}}>
				<List>
					<ListItem>
						<Link href='/'>
							<Image
								src='/assets/logo-v2.png'
								width={200}
								height={90}
								alt='FreeMove Logo'
							/>
						</Link>
					</ListItem>
					<ListItem>
						<ListItemButton onClick={() => setIsMenuOpen(false)} href='#ciudad'>
							<ListItemIcon>
								<Apartment />
							</ListItemIcon>
							<ListItemText primary='Ciudad' />
						</ListItemButton>
					</ListItem>
					<ListItem>
						<ListItemButton onClick={() => setIsMenuOpen(false)} href='#salud'>
							<ListItemIcon>
								<HealthAndSafety />
							</ListItemIcon>
							<ListItemText primary='Salud' />
						</ListItemButton>
					</ListItem>
					<ListItem>
						<ListItemButton
							onClick={() => setIsMenuOpen(false)}
							href='#servicios'>
							<ListItemIcon>
								<MiscellaneousServices />
							</ListItemIcon>
							<ListItemText primary='Servicios' />
						</ListItemButton>
					</ListItem>
					<ListItem>
						<ListItemButton
							onClick={() => setIsMenuOpen(false)}
							href='#proceso'>
							<ListItemIcon>
								<AccountTree />
							</ListItemIcon>
							<ListItemText primary='Proceso' />
						</ListItemButton>
					</ListItem>
					<ListItem>
						<Link
							href='/dashboard'
							className={styles.btnDashboard}
							style={{
								marginTop: '1rem',
							}}>
							Registro/Ingreso
						</Link>
					</ListItem>
				</List>
			</Drawer>
		</>
	);
};
