import { MuiProvider } from '@/mui';
import './globals.css';

export const metadata = {
	title: 'FreeMove',
	description:
		'Comparte todas tus aventuras con tus amigos y analiza tus estadísticas dentro de las rutas gracias a FreeMove',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='es'>
			<body suppressHydrationWarning={true}>
				<MuiProvider>{children}</MuiProvider>
			</body>
		</html>
	);
}
