import {
	FacebookAuthProvider,
	GoogleAuthProvider,
	getAdditionalUserInfo,
	getAuth,
	signInWithEmailAndPassword,
	signInWithPopup,
} from 'firebase/auth';
import firebaseApp from './config';

const auth = getAuth(firebaseApp);

export async function signIn(email: string, password: string) {
	let result = null;
	let error = null;
	try {
		result = await signInWithEmailAndPassword(auth, email, password);
	} catch (e) {
		error = e;
	}

	return { result, error };
}

export type ProvidersTypes = 'google' | 'facebook';

export async function signInWithProvider(providerType: ProvidersTypes) {
	let result: any = null;
	let error;
	let provider;
	try {
		switch (providerType) {
			case 'google':
				provider = new GoogleAuthProvider();
				break;
			case 'facebook':
				provider = new FacebookAuthProvider();
				break;
			default:
				provider = new GoogleAuthProvider();
				break;
		}
		result = await signInWithPopup(auth, provider);
		const details = getAdditionalUserInfo(result!);
		result = { ...result, additionalUserInfo: details };
	} catch (e) {
		error = e;
	}

	return { result, error };
}
