import { Footer, Navbar } from '@/components';
import styles from './page.module.css';
import Image from 'next/image';

const sliderPhotos = [
	'assets/slider/slider-1',
	'assets/slider/slider-2',
	'assets/slider/slider-3',
	'assets/slider/slider-4',
];

export default function Home() {
	return (
		<>
			<main className={styles.header}>
				<Navbar />
				<div className={styles.headerSlider}>
					<div className={styles.headerWrapper}>
						{sliderPhotos.map((photo, index) => (
							<picture key={index}>
								<source type='image/webp' srcSet={`${photo}.webp`} />
								<img src={`${photo}.jpg`} alt='Slider images' />
							</picture>
						))}
					</div>
				</div>
				<div className={styles.headerLogo}>
					<picture>
						<source type='image/webp' srcSet='assets/home/logo-header.webp' />
						<img src='assets/home/logo-header.png' alt='FreeMove' />
					</picture>
				</div>
			</main>

			<section className={styles.cityInformation} id='ciudad'>
				<header className={styles.cityHeader}>
					<h2>Ciudad Inteligente</h2>
				</header>

				<div className={styles.infoCards}>
					<div className={styles.infoCard}>
						<p>400</p>
						<div className={styles.cardImg}>
							<Image
								src='assets/home/rutas-icon.svg'
								alt='Rutas'
								width={90}
								height={90}
							/>
							<p>Rutas</p>
						</div>
					</div>
					<div className={styles.infoCard}>
						<p>200</p>
						<div className={styles.cardImg}>
							<Image
								src='assets/home/ciclistas-icon.svg'
								alt='Ciclistas'
								width={90}
								height={90}
							/>
							<p>Ciclistas</p>
						</div>
					</div>
					<div className={styles.infoCard}>
						<p>50</p>
						<div className={styles.cardImg}>
							<Image
								src='assets/home/incidentes-icon.svg'
								alt='Incidentes'
								width={90}
								height={90}
							/>
							<p>Incidentes</p>
						</div>
					</div>
				</div>
			</section>

			<section className={styles.healthInformation} id='salud'>
				<picture>
					<source
						className={styles.healthBackground}
						type='image/webp'
						srcSet='assets/home/salud-fondo.webp'
					/>
					<img
						className={styles.healthBackground}
						src='assets/home/salud-fondo.png'
						alt='Salud'
						loading='lazy'
					/>
				</picture>
				<div className={styles.healthBackgroundContainer}>
					<div className={styles.healthContainer}>
						<div className={styles.healthImg}>
							<picture>
								<source type='image/webp' srcSet='assets/logo.webp' />
								<img src='assets/logo.png' alt='FreMove logo' loading='lazy' />
							</picture>
						</div>
						<div className={styles.healthText}>
							<h3>Salud</h3>
							<ul>
								<li>Registra tu información corporal: peso y altura.</li>
								<li>Observa tus resultados de salud.</li>
								<li>Avances del estado físico: quema de calorías.</li>
								<li>Alerta de descanso e hidratación.</li>
							</ul>
						</div>
					</div>
				</div>
			</section>

			<section className={styles.servicesInformation} id='servicios'>
				<div className={styles.servicesContainer}>
					<div className={styles.servicesCard}>
						<Image
							width={200}
							height={200}
							src='/assets/home/bitacora.png'
							alt='Bitácora'
						/>

						<div className={styles.servicesCardInformation}>
							<div className={styles.servicesCardInformationList}>
								<ul>
									<li>Rutas realizadas.</li>
									<li>Distancias recorridas.</li>
									<li>Calorías quemadas.</li>
								</ul>
							</div>
							<p>Bitácora</p>
						</div>
					</div>
					<div className={styles.servicesCard}>
						<Image
							width={200}
							height={200}
							src='/assets/home/seguridad.png'
							alt='Seguridad'
						/>

						<div className={styles.servicesCardInformation}>
							<div className={styles.servicesCardInformationList}>
								<ul>
									<li>Reporte de incidentes.</li>
									<li>Seguimientos a terceros.</li>
									<li>Botón de pánico.</li>
								</ul>
							</div>
							<p>Seguridad</p>
						</div>
					</div>
					<div className={styles.servicesCard}>
						<Image
							width={200}
							height={200}
							src='/assets/home/comparte.png'
							alt='Comparte'
						/>

						<div className={styles.servicesCardInformation}>
							<div className={styles.servicesCardInformationList}>
								<ul>
									<li>Ruta seleccionada y nivel de complejidad.</li>
									<li>
										Difundir fotos realizados durante el recorrido de una ruta.
									</li>
									<li>Compartir logros obtenidos durante una ruta asignada.</li>
									<li>Observar el número de seguidores y seguidos.</li>
								</ul>
							</div>
							<p>Comparte</p>
						</div>
					</div>
				</div>
			</section>

			<section className={styles.processInformation} id='proceso'>
				<h3 className={styles.processTitle}>Proceso</h3>
				<div className={styles.processContainer}>
					<div className={styles.processItem}>
						<Image
							width={50}
							height={50}
							src='/assets/home/process1.svg'
							alt='Proceso'
						/>
					</div>
					<div className={styles.processArrow}>
						<Image
							width={50}
							height={50}
							src='/assets/home/arrow.svg'
							alt='Flecha'
						/>
					</div>
					<div className={styles.processItem}>
						<Image
							width={50}
							height={50}
							src='/assets/home/process2.svg'
							alt='Proceso'
						/>
					</div>
					<div className={styles.processArrow}>
						<Image
							width={50}
							height={50}
							src='/assets/home/arrow.svg'
							alt='Flecha'
						/>
					</div>
					<div className={styles.processItem}>
						<Image
							width={50}
							height={50}
							src='/assets/home/process3.svg'
							alt='Proceso'
						/>
					</div>
					<div className={styles.processArrow}>
						<Image
							width={50}
							height={50}
							src='/assets/home/arrow.svg'
							alt='Flecha'
						/>
					</div>
					<div className={styles.processItem}>
						<Image
							width={50}
							height={50}
							src='/assets/home/process4.svg'
							alt='Proceso'
						/>
					</div>
					<div className={styles.processArrow}>
						<Image
							width={50}
							height={50}
							src='/assets/home/arrow.svg'
							alt='Flecha'
						/>
					</div>
					<div className={styles.processItem}>
						<Image
							width={50}
							height={50}
							src='/assets/home/process5.svg'
							alt='Proceso'
						/>
					</div>
				</div>
			</section>

			<Footer />
		</>
	);
}
