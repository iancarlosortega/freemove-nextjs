'use client';

import { AuthContext } from '@/context/auth';
import { useContext } from 'react';

export default function DashboardPage() {
	const { user } = useContext(AuthContext);
	console.log(user);
	return <div>DashboardPage</div>;
}
