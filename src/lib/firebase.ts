import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBpbHMjDkStia7SZnRf85ZSjVNIhx6BIeA",
  authDomain: "vlottr.firebaseapp.com",
  projectId: "vlottr",
  storageBucket: "vlottr.firebasestorage.app",
  messagingSenderId: "245476426806",
  appId: "1:245476426806:web:c54a2933300786c8be0497"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;