import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import firebaseApp from './config';

const auth = getAuth(firebaseApp);

export async function resetPassword(email: string) {
	let result = null;
	let error = null;
	try {
		result = await sendPasswordResetEmail(auth, email);
	} catch (e) {
		error = e;
	}

	return { result, error };
}
