'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

export const Navbar = () => {
	const pathname = usePathname();
	const style = {
		backgroundColor: pathname === '/' ? 'transparent' : 'var(--dark-blue)',
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

			{/* TODO: Navbar Phone */}
		</>
	);
};
