import { initializeApp, getApps, cert } from 'firebase-admin/app';

const firebaseAdminConfig = {
	credential: cert({
		projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
		clientEmail: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_CLIENT_EMAIL,
		privateKey: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PRIVATE_KEY?.replace(
			/\\n/g,
			'\n'
		),
	}),
};

export function customInitApp() {
	if (getApps().length <= 0) {
		initializeApp(firebaseAdminConfig);
	}
}
