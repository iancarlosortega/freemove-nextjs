import './globals.css';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
	subsets: ['latin'],
	weight: ['300', '400', '500', '600', '700'],
});

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
			<body className={poppins.className}>{children}</body>
		</html>
	);
}
