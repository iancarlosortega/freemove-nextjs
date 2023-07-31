import {
	BitacoraIcon,
	CommunityIcon,
	DashboardIcon,
	EmailIcon,
	GalleryIcon,
	HealthIcon,
	IncidetsIcon,
	LinkAccountIcon,
	PasswordIcon,
	RoutesIcon,
	SettingsIcon,
	TrackingIcon,
	UsersIcon,
} from '../components/icons';

interface MenuItems {
	title: string;
	isAvailable: boolean;
	subItems: SubItems[];
}

interface SubItems {
	name: string;
	route: string;
	icon: JSX.Element;
	isAvailable: boolean;
}

export const menuItems: MenuItems[] = [
	{
		title: '',
		isAvailable: true,
		subItems: [
			{
				name: 'Dashboard',
				icon: <DashboardIcon />,
				route: '/dashboard',
				isAvailable: true,
			},
			{
				name: 'Rutas',
				icon: <RoutesIcon />,
				route: './rutas',
				isAvailable: true,
			},
			{
				name: 'Galería',
				icon: <GalleryIcon />,
				route: './galeria',
				isAvailable: true,
			},
			{
				name: 'Salud',
				icon: <HealthIcon />,
				route: './salud',
				isAvailable: true,
			},
			{
				name: 'Bitácora',
				icon: <BitacoraIcon />,
				route: './bitacora',
				isAvailable: true,
			},
			{
				name: 'Incidentes',
				icon: <IncidetsIcon />,
				route: './incidentes',
				isAvailable: true,
			},
			{
				name: 'Comunidad',
				icon: <CommunityIcon />,
				route: './comunidad',
				isAvailable: true,
			},
			{
				name: 'Rastreo',
				icon: <TrackingIcon />,
				route: './rastreo',
				isAvailable: true,
			},
		],
	},
	{
		title: 'Administración',
		isAvailable: true,
		subItems: [
			{
				name: 'Usuarios',
				icon: <UsersIcon />,
				route: './admin/usuarios',
				isAvailable: true,
			},
			{
				name: 'Rutas',
				icon: <RoutesIcon />,
				route: './admin/rutas',
				isAvailable: true,
			},
			{
				name: 'Incidentes',
				icon: <IncidetsIcon />,
				route: './admin/incidentes',
				isAvailable: true,
			},
		],
	},
	{
		title: 'Configuración',
		isAvailable: true,
		subItems: [
			{
				name: 'Ajustes',
				icon: <SettingsIcon />,
				route: './ajustes',
				isAvailable: true,
			},
			{
				name: 'Vincular cuenta',
				icon: <LinkAccountIcon />,
				route: './vincular-cuenta',
				isAvailable: true,
			},
			{
				name: 'Email',
				icon: <EmailIcon />,
				route: './cambiar-correo',
				isAvailable: true,
			},
			{
				name: 'Contraseña',
				icon: <PasswordIcon />,
				route: './cambiar-clave',
				isAvailable: true,
			},
		],
	},
];
