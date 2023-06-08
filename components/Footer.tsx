import Image from 'next/image';
import Link from 'next/link';
import styles from './Footer.module.css';

export const Footer = () => {
	const year = new Date().getFullYear();
	return (
		<footer className={styles.footer}>
			<div className='container'>
				<div className={styles.footerLogos}>
					<div>
						<Link href='/'>
							<Image
								src='/assets/logo-gray.png'
								width={300}
								height={200}
								alt='FreeMove Logo'
							/>
						</Link>
					</div>
					<div>
						<Image
							width={200}
							height={90}
							src='/assets/logo-smartland.png'
							alt='SmartLand Logo'
						/>
					</div>

					<div>
						<Image
							width={200}
							height={90}
							src='/assets/logo-utpl.png'
							alt='UTPL Logo'
						/>
					</div>
				</div>
				<div className={styles.footerTexts}>
					<p className={styles.textShort}>Observatorio de Movilidad</p>
					<p className={styles.textShort}>
						Ciencias de la Computación y Electrónica
					</p>
				</div>

				<hr className={styles.divider} />
				<p className={styles.copyright}>Derechos Reservados UTPL - {year}</p>
				<div className={styles.footerLinks}>
					<a
						target='_blank'
						href='https://www.facebook.com/profile.php?id=100086681644370'>
						<Image
							width={50}
							height={50}
							src='/assets/home/facebook-icon.svg'
							alt='Facebook Logo'
							loading='lazy'
						/>
					</a>
					<a target='_blank' href='https://twitter.com/Freemoveec'>
						<Image
							width={50}
							height={50}
							src='/assets/home/twitter-icon.svg'
							alt='Twitter Logo'
							loading='lazy'
						/>
					</a>
					<a target='_blank' href='https://www.instagram.com/freemoveec/'>
						<Image
							width={50}
							height={50}
							src='/assets/home/instagram-icon.svg'
							alt='Instagram Logo'
							loading='lazy'
						/>
					</a>
				</div>
			</div>
		</footer>
	);
};
