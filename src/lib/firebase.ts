import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCPzd7uSqCLZZSxUq2eMWGtG602DnEnqW4",
  authDomain: 'jong046.firebaseapp.com',
  projectId: 'jong046',
  storageBucket: 'jong046.firebasestorage.app',
  messagingSenderId: '342257774025',
  appId: "1:342257774025:web:767cc9ac4ee0a575df4c18",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);