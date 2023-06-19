import styles from './auth.module.css';

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className={styles.authContainer}>
			<div className={styles.authCard}>{children}</div>
		</div>
	);
}
