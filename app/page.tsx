import Image from 'next/image';
import { Footer, Navbar } from '@/components';
import { Logo } from '@/components/icons';
import styles from './page.module.css';

const sliderPhotos = [
	'/assets/slider/slider-1.webp',
	'/assets/slider/slider-2.webp',
	'/assets/slider/slider-3.webp',
	'/assets/slider/slider-4.webp',
];

export default function Home() {
	return (
		<>
			<main className={styles.header}>
				<Navbar />
				<div className={styles.headerSlider}>
					<div className={styles.headerWrapper}>
						{sliderPhotos.map((photo, index) => (
							<Image
								key={index}
								src={photo}
								alt='Slider images'
								width={1920}
								height={1080}
							/>
						))}
					</div>
				</div>
				<div className={styles.headerLogo}>
					<Image
						src='/assets/home/logo-header.webp'
						alt='Slider images'
						width={500}
						height={500}
					/>
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
								src='/assets/home/rutas-icon.svg'
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
								src='/assets/home/ciclistas-icon.svg'
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
								src='/assets/home/incidentes-icon.svg'
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
				<Image
					className={styles.healthBackground}
					src='/assets/home/salud-fondo.webp'
					alt='Incidentes'
					width={1920}
					height={500}
				/>
				<div className={styles.healthBackgroundContainer}>
					<div className={styles.healthContainer}>
						<div className={styles.healthImg}>
							<Logo />
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
