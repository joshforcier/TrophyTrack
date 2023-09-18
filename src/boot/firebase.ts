import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyBs4xjros0wrQ6SoEwk0nxFtCZRfjlKtCA',
    authDomain: 'trophy-track.firebaseapp.com',
    projectId: 'trophy-track',
    storageBucket: 'trophy-track.appspot.com',
    messagingSenderId: '430281411879',
    appId: '1:430281411879:web:a4dd2caf23c501254aed02',
    measurementId: 'G-W083RDV1FS',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { auth, db };
