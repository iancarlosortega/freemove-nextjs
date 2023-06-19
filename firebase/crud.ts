import { getFirestore, collection, addDoc } from 'firebase/firestore';

const db = getFirestore();

export const createDocument = async (collectionName: string, data: any) => {
	return await addDoc(collection(db, collectionName), data);
};
