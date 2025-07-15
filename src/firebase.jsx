import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBKvOjgKeZUkL9yU-mTY9r8kOW9voCzJg8",
  authDomain: "examen2-2ef33.firebaseapp.com",
  projectId: "examen2-2ef33",
  storageBucket: "examen2-2ef33.firebasestorage.app",
  messagingSenderId: "228367882666",
  appId: "1:228367882666:web:1a7576747f04296bf5b3d3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { db, auth, googleProvider };