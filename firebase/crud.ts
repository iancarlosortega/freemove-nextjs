import {
	getFirestore,
	collection,
	addDoc,
	doc,
	getDoc,
} from 'firebase/firestore';

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

export const getDocById = async (collectionName: string, id: string) => {
	let result = null;
	let error = null;
	try {
		const docRef = doc(db, collectionName, id);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			result = docSnap.data();
		} else {
			throw Error('No such document!');
		}
	} catch (e) {
		error = e;
	}

	return { result, error };
};
