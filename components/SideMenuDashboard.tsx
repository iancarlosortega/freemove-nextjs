'use client';

import { Button } from '@mui/material';
import Link from 'next/link';
import { Logo } from './icons';

import styles from './SideMenuDashboard.module.css';
import { AddAlert, Logout } from '@mui/icons-material';

interface MenuItems {
	title: string;
	subItems: SubItems[];
}

interface SubItems {
	name: string;
	route: string;
	icon: string;
}

const menuItems: MenuItems[] = [];

export const SideMenuDashboard = () => {
	return (
		<aside>
			<Link href='/'>
				<Logo />
			</Link>
			{menuItems.map((item, index) => (
				<div key={index}>
					<h5>{item.title}</h5>
					<ul>
						{item.subItems.map((subItem, index) => (
							<li key={index}>
								<Link href={subItem.route}>
									{/* <Image src={subItem.icon} alt={subItem.name} /> */}
									<p>{subItem.name}</p>
								</Link>
							</li>
						))}
					</ul>
				</div>
			))}

			<Button variant='gradient' color='error'>
				{true ? 'Activar Alerta' : 'Pausar Alerta'}
				<AddAlert />
			</Button>
			{/* <Button
			*ngIf="alert?.isActive"
			className="gradient-button desactivate-button"
			(click)="desactivateAlert()"
			>
				Pausar Alerta
				<mat-icon>stop</mat-icon>
			</Button> */}

			<Button variant='gradient'>
				Cerrar sesión
				<Logout />
			</Button>
		</aside>
	);
};
