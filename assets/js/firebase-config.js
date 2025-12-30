// Firebase Configuration for Rakshita
// Replace with your actual Firebase config after creating project

const firebaseConfig = {
  apiKey: "AIzaSyAcRWW37Yk_la-9Ty0G24mSoS5BL6h5mXw",
  authDomain: "rakshita-safety.firebaseapp.com",
  projectId: "rakshita-safety",
  storageBucket: "rakshita-safety.firebasestorage.app",
  messagingSenderId: "686001055646",
  appId: "1:686001055646:web:d8c811390ee14b9b71588f",
  measurementId: "G-9MZ37VFJR8"
};

// Initialize Firebase
import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);

// For development - uncomment to use Firebase emulators
// if (location.hostname === 'localhost') {
//   connectAuthEmulator(auth, 'http://localhost:9099');
//   connectFirestoreEmulator(db, 'localhost', 8080);
// }

export default app;