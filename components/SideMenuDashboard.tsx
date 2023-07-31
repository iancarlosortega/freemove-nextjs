'use client';

import Link from 'next/link';
import { Button } from '@mui/material';
import { AddAlert, Logout, Stop } from '@mui/icons-material';

import { Logo } from './icons';
import { menuItems } from '@/constants';

import styles from './SideMenuDashboard.module.css';

export const SideMenuDashboard = () => {
	return (
		<aside className={styles.sideMenu}>
			<Link className={styles.logo} href='/'>
				<Logo />
			</Link>
			{menuItems.map((item, index) => (
				<div key={index}>
					<h5 className={styles.sectionTitle}>{item.title}</h5>
					<ul className={styles.listItems}>
						{item.subItems.map((subItem, index) => (
							<li key={index}>
								<Link href={subItem.route}>
									{subItem.icon}
									<p>{subItem.name}</p>
								</Link>
							</li>
						))}
					</ul>
				</div>
			))}

			<Button variant='gradient' color={true ? 'error' : 'success'}>
				{true ? 'Activar Alerta' : 'Pausar Alerta'}
				{true ? <AddAlert /> : <Stop />}
			</Button>

			<Button variant='gradient'>
				Cerrar sesión
				<Logout />
			</Button>
		</aside>
	);
};
