import { getFirestore, collection, addDoc } from 'firebase/firestore';

const db = getFirestore();

export const createDocument = async (collectionName: string, data: any) => {
	let result = null;
	let error = null;
	try {
		result = await addDoc(collection(db, collectionName), data);
	} catch (e) {
		error = e;
	}

	return { result, error };
};
