'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';
import { TextField } from '@mui/material';

export const Navbar = () => {
	const pathname = usePathname();
	const style = {
		backgroundColor: pathname === '/' ? 'black' : 'var(--dark-blue)',
	};

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
						<a href='#city'>Ciudad</a>
					</li>
					<li className={styles.listItem}>
						<a href='#health'>Salud</a>
					</li>
					<li className={styles.listItem}>
						<a href='#services'>Servicios</a>
					</li>
					<li className={styles.listItem}>
						<a href='#process'>Proceso</a>
					</li>
					<li>
						<Link href='/dashboard' className={styles.btnDashboard}>
							Registro/Ingreso
						</Link>
					</li>
				</ul>
			</nav>

			<TextField id='filled-basic' label='Filled' variant='filled' />

			<p>
				Reprehenderit minim id dolor id eu ad anim non sint nulla nulla est
				consectetur. Sit sint culpa pariatur non. Lorem excepteur deserunt enim
				ipsum laborum eu aliquip ea. Ad ullamco labore tempor ea qui id quis
				labore commodo duis anim. Cupidatat Lorem ad tempor ullamco.
			</p>

			{/* TODO: Navbar Phone */}
		</>
	);
};
