import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import * as auth from 'firebase/auth';
import {
	doc,
	DocumentData,
	getDoc,
	getFirestore,
	setDoc,
} from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyCoSyASMNmlAcuNgux0AHZy3N3di7F5c3I',
	authDomain: 'dyno-timer.firebaseapp.com',
	projectId: 'dyno-timer',
	storageBucket: 'dyno-timer.appspot.com',
	messagingSenderId: '909798310708',
	appId: '1:909798310708:web:3120df0f3302aabe741b61',
	measurementId: 'G-8XFYSLDZPZ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);
const db = getFirestore();

// util functions
async function getFirebaseDocument(
	collectionName: string,
	documentId: string,
): Promise<DocumentData | null> {
	try {
		const docRef = doc(db, collectionName, documentId);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			return docSnap.data();
		}

		return null;
	} catch (error) {
		throw error;
	}
}

export { auth, db, doc, setDoc, getFirebaseDocument };
