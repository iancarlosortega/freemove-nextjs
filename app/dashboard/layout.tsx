import { SideMenuDashboard } from '@/components';

import styles from './Layout.module.css';

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<main className={styles.layoutGrid}>
			<SideMenuDashboard />
			<div
				style={{
					backgroundColor: '#f5f5f5',
				}}>
				{/* Header */}
				{children} {/* Page content */}
			</div>
		</main>
	);
}
